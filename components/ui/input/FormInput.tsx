import {
  Control,
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

import Input from "./Input";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

export default function FormInput<T extends FieldValues>({
  name,
  ...props
}: FormInputProps<T>) {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Input
      {...props}
      {...field}
      value={field.value ?? ""}
      error={error?.message}
    />
  );
}