const HUGGING_FACE_URL = 'https://huggingface.co/smartclover';

const RepoIconLinks = ({ githubHref, labelPrefix = 'Open source links' }) => (
  <div className="icon-link-pair" aria-label={labelPrefix}>
    <a
      href={githubHref}
      className="icon-link-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open GitHub repository"
      title="Open GitHub repository"
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.24.49-2.71-1.08-2.71-1.08-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.82 1.23.82.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.79-.2-3.67-.89-3.67-3.96 0-.87.31-1.58.82-2.13-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.81a7.6 7.6 0 0 1 4 0c1.53-1.02 2.2-.81 2.2-.81.44 1.1.16 1.92.08 2.12.51.55.82 1.26.82 2.13 0 3.08-1.89 3.76-3.69 3.96.29.25.55.74.55 1.5l-.01 2.22c0 .21.14.45.55.38A8 8 0 0 0 8 0Z" />
      </svg>
    </a>
    <a
      href={HUGGING_FACE_URL}
      className="icon-link-button icon-link-hf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open SmartClover on Hugging Face"
      title="Open SmartClover on Hugging Face"
    >
      <span aria-hidden="true">HF</span>
    </a>
  </div>
);

export default RepoIconLinks;
