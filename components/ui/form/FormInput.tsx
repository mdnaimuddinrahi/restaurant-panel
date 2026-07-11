import {
  Control,
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

import Input from "../input/Input";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

export default function FormInput<T extends FieldValues>({
  name,
  type,
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
      type={type}
      value={field.value ?? ""}
      error={error?.message}
       onChange={(e) => {
        if (type === "number") {
          field.onChange(
            e.target.value === ""
              ? undefined
              : Number(e.target.value)
          );
        } else {
          field.onChange(e.target.value);
        }
      }}
    />
  );
}