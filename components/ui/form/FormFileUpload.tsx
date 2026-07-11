"use client";

import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import FileUpload from "../input/FileUpload";

interface FormFileUploadProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
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
}: FormFileUploadProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FileUpload
            label={label}
            required={required}
            accept={accept}
            disabled={disabled}
            files={field.value ?? []}
            onFilesChange={field.onChange}
            error={fieldState.error?.message}
            multiple={multiple}
        />
      )}
    />
  );
}