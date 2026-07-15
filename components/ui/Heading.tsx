
export default function Heading({
  title,
  subtitle,
  buttonText,
  onAddClick,
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onAddClick?: () => void;
}) {

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left side */}
      <div>
        {title && (
          <h1 className="font-display text-2xl font-700 tracking-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right side */}
      {buttonText && (
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 accent-bg text-white text-sm rounded-xl hover:opacity-90 transition-opacity font-500 shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {buttonText}
        </button>
      )}
    </div>
  );
}