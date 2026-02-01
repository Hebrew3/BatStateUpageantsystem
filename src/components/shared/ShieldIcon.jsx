export function ShieldIcon({ className = "w-12 h-12" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="48"
      height="48"
      aria-hidden
      className={className}
    >
      <path
        fill="#c62828"
        d="M12 1l7 3v5c0 5.25-3.75 9-7 10-3.25-1-7-4.75-7-10V4l7-3z"
      />
      <path
        fill="#fff"
        d="M12 6.5c-1.93 0-3.5 1.57-3.5 3.5S10.07 13.5 12 13.5s3.5-1.57 3.5-3.5S13.93 6.5 12 6.5z"
      />
    </svg>
  );
}

