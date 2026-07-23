"use client";

import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import FileUpload from "../input/FileUpload";
import { strict } from "assert";

interface FormFileUploadProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  existingFiles?: string[];
  existingFile?: string;
}

export default function FormFileUpload<
  T extends FieldValues
>({
  name,
  label,
  required=false,
  accept,
  disabled,
  multiple=false,
  existingFiles,
  existingFile
}: FormFileUploadProps<T>) {
  const { control } = useFormContext<T>();
  

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        console.log('fieldState.error', fieldState.error)
        const errorMessage = Array.isArray(fieldState.error)
                                    ? fieldState.error[0]?.message
                                    : fieldState.error?.message;
        return <FileUpload
                  label={label}
                  required={required}
                  accept={accept}
                  disabled={disabled}
                  files={field.value ?? []}
                  onFilesChange={field.onChange}
                  error={errorMessage}
                  multiple={multiple}
                  existingFiles={existingFiles ?? []}
                  existingFile={existingFile ?? ''}
              />
      }}
    />
  );
}