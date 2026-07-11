"use client";

interface LabelProps {
  label: string;
  required?: boolean;
  isError?: boolean;
  htmlFor?: string;
  className?: string;
}

export default function Label({
  label,
  required = false,
  isError = false,
  htmlFor,
  className = "",
}: LabelProps) {
  return (
    <label
        htmlFor={htmlFor}
        className={`
            mb-1.5 block text-xs font-medium transition-colors duration-300
            ${ isError ? "text-red-500" : "text-slate-500 dark:text-slate-200" }
            ${className}
        `}
        >{label}
        {required && (
            <span className="ml-1 text-red-500">*</span>
        )}
    </label>
  );
}