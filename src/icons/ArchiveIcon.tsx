function ArchiveIcon({
  width,
  height,
  stroke,
  strokeWidth,
}: {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke || "currentColor"}
      strokeWidth={strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-archive"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

export default ArchiveIcon;
