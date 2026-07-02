#!/usr/bin/env node
/**
 * Recompress the PNG assets under public/ in place.
 *
 * - Downscales anything wider than MAX_WIDTH (nothing on the site renders
 *   wider than ~1200 CSS px, so 1600 keeps 2x headroom for hero slots).
 * - Quantizes to palette PNG (libimagequant) which cuts the AI-generated
 *   marketing images and UI screenshots by 60-90% with no visible loss.
 * - Only rewrites a file when the result is actually smaller.
 *
 * The raw files still matter after next/image optimization: they are served
 * directly to og:image scrapers and markdown <img> tags in blog bodies, and
 * they are the transform input for /_next/image.
 *
 * Usage: node scripts/optimize-images.mjs
 * After changing an image's pixels, bump its versioned filename (_vX.Y) or
 * purge caches: /images/* and /blog/images/* are served with a 30-day TTL.
 */
import { readdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname;
const MAX_WIDTH = 1600;
const MIN_BYTES = 100 * 1024;
const PALETTE_QUALITY = 90;
const FAVICON_SIZE = 192;
// Operator-locked article assets: published verbatim, never re-encoded here.
const EXCLUDED = new Set([
  'blog/images/collaboration-flow-imagegen.png',
  'blog/images/evidence-flow-imagegen.png',
  'blog/images/nis2compass-blog-hero-auditor-evidence-variant-3.png'
]);

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(fullPath) : [fullPath];
    })
  );
  return files.flat();
};

const formatKb = (bytes) => `${Math.round(bytes / 1024)}KB`;

const optimize = async (file) => {
  if (EXCLUDED.has(path.relative(PUBLIC_DIR, file))) {
    return;
  }

  const { size: before } = await stat(file);
  const isFavicon = path.basename(file) === 'favicon.png';
  if (!isFavicon && before < MIN_BYTES) {
    return;
  }

  const pipeline = sharp(file).rotate();
  if (isFavicon) {
    pipeline.resize({ width: FAVICON_SIZE, height: FAVICON_SIZE, fit: 'inside', withoutEnlargement: true });
  } else {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  const output = await pipeline
    .png({ palette: true, quality: PALETTE_QUALITY, compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  if (output.length >= before) {
    console.log(`skip  ${path.relative(PUBLIC_DIR, file)} (${formatKb(before)}, no gain)`);
    return;
  }

  const tmp = `${file}.tmp`;
  await writeFile(tmp, output);
  await rename(tmp, file).catch(async (error) => {
    await unlink(tmp).catch(() => {});
    throw error;
  });
  const meta = await sharp(file).metadata();
  console.log(
    `write ${path.relative(PUBLIC_DIR, file)} ${formatKb(before)} -> ${formatKb(output.length)} (${meta.width}x${meta.height})`
  );
};

const pngFiles = (await walk(PUBLIC_DIR)).filter((file) => file.toLowerCase().endsWith('.png'));
for (const file of pngFiles.sort()) {
  await optimize(file);
}
