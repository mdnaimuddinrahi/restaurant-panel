"use client";

import {
  ChangeEvent,
  DragEvent,
  InputHTMLAttributes,
  useId,
  useRef,
  useState,
  useEffect,
} from "react";
import { FiUploadCloud, FiFile, FiTrash2 } from "react-icons/fi";
import { useTheme } from "@/theme";
import Label from "../Label";
import { useTranslation } from "react-i18next";

interface FileUploadProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value"
  > {
  label?: string;
  name?: string;

  required?: boolean;
  error?: string;

    multiple?: boolean;
  files?: File[];
  onFilesChange?: (files: File[]) => void;
  existingFiles?: string[];
  existingFile?: string;
}

export default function FileUpload({
  label,
  name,
  required,
  error,
  files = [],
  onFilesChange,
  accept,
  disabled,
  multiple = false,
  ...props
}: FileUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const { accentColor, darkMode } = useTheme();

  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState(false);

//   const handleFile = (file: File | null) => {
//     onChange?.(file);
//   };
const handleFile = (files: File[]) => {
  onFilesChange?.(files);
};

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     handleFile(e.target.files?.[0] || null);
//   };
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const selectedFiles = Array.from(e.target.files ?? []);

  if (multiple) {
    // Append newly picked files to whatever was already selected.
    handleFile([...files, ...selectedFiles]);
  } else {
    // Single mode always takes exactly one file and replaces the old one.
    handleFile(selectedFiles.slice(0, 1));
  }

  // Reset the native input value so selecting the same file again
  // (e.g. after removing it) still fires onChange.
  e.target.value = "";
};

//   const handleDrop = (
//     e: DragEvent<HTMLLabelElement>
//   ) => {
//     e.preventDefault();
//     setDragging(false);

//     const file = e.dataTransfer.files?.[0];
//     if (!file) return;

//     handleFile(files);
//   };
const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  setDragging(false);

  const droppedFiles = Array.from(e.dataTransfer.files);

  if (multiple) {
    // Append dropped files to whatever was already selected.
    handleFile([...files, ...droppedFiles]);
  } else {
    // Single mode always takes exactly one file and replaces the old one.
    handleFile(droppedFiles.slice(0, 1));
  }
};

//   const removeFile = () => {
//     handleFile(null);

//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   };
// const removeFile = (index: number) => {
//   const updated = files.filter((_, i) => i !== index);
//   onFilesChange?.(updated);
// };
const removeFile = (index: number) => {
  const updated = files.filter((_, i) => i !== index);
  onFilesChange?.(updated);

  if (inputRef.current && updated.length === 0) {
    inputRef.current.value = "";
  }
};

  const active = dragging || focused;
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(() => {
    const urls = files.map((file) =>
        file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : ""
    );

    setPreviews(urls);

    return () => {
        urls.forEach((url) => {
        if (url) {
            URL.revokeObjectURL(url);
        }
        });
    };
    }, [files]);
  const { t } = useTranslation(["common"]);

  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={id}
          label={label}
          required={required}
          isError={!!error}
        />
        // <label
        //   htmlFor={id}
        //   className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        // >
        //   {label}

        //   {required && (
        //     <span className="ml-1 text-red-500">*</span>
        //   )}
        // </label>
      )}

      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          borderColor: active
            ? accentColor
            : error
            ? "#ef4444"
            : undefined,
          boxShadow: active
            ? `0 0 0 3px ${accentColor}20`
            : undefined,
        }}
        className={`
          group relative block cursor-pointer overflow-hidden rounded-xl border-2 border-dashed
          bg-white dark:bg-slate-900
          transition-all duration-300
          hover:scale-[1.01]
          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : ""
          }
          ${
            error
              ? "border-red-500"
              : "border-slate-300 dark:border-slate-700"
          }
        `}
      >
        <input
          
          {...props}
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          disabled={disabled}
          className="hidden"
          multiple={multiple}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleInputChange}
        />

        <div className="flex flex-col items-center justify-center px-6 py-8">
          <div
            style={{
              color: active
                ? accentColor
                : darkMode
                ? "#94a3b8"
                : "#64748b",
            }}
            className={`
              mb-3 rounded-full p-3
              transition-all duration-300
              ${
                active
                  ? "scale-110"
                  : "scale-100"
              }
            `}
          >
            <FiUploadCloud size={30} />
          </div>

          {files.length === 0 ? (
            <>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {/* Drag & drop {multiple ? "files" : "a file"} here */}
                {t("drag_drop", {
                    fileType: multiple
                      ? t("files")
                      : t("file"),
                  })}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t('click_to_browse')}
                </p>
            </>
            ) : (
            <div className="w-full max-w-md space-y-2">
                {files.map((file, index) => (
                    <div
                        key={`${file.name}-${file.lastModified}`}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = accentColor;
                            e.currentTarget.style.backgroundColor = `${accentColor}10`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "";
                            e.currentTarget.style.backgroundColor = "";
                        }}
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            {/* <FiFile
                                size={18}
                                color={accentColor}
                            /> */}
                            {file.type.startsWith("image/") ? (
                                <img
                                    src={previews[index]}
                                    alt={file.name}
                                    className="h-14 w-14 rounded-lg object-cover border"
                                />
                                ) : (
                                <div className="flex h-14 w-14 items-center justify-center rounded-lg border">
                                    <FiFile
                                    size={22}
                                    color={accentColor}
                                    />
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-100">
                                {file.name}
                                </p>

                                <p className="text-xs text-slate-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                removeFile(index);
                            }}
                            className="rounded-md p-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
            )}
        </div>
      </label>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
