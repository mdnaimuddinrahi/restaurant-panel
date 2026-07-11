import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

import AppTimePicker, {
  AppTimePickerProps,
} from "../input/AppTimePicker";

type FormTimePickerProps<T extends FieldValues> = Omit<
  AppTimePickerProps,
  "value" | "onChange" | "error"
> & {
  name: Path<T>;
};

export default function FormTimePicker<
  T extends FieldValues
>({
  name,
  ...props
}: FormTimePickerProps<T>) {
  const { control } = useFormContext<T>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  // console.log('field.value', typeof field.value)

  return (
    <AppTimePicker
      {...props}
      value={field.value ?? ""}
      onChange={field.onChange}
      error={error?.message}
    />
  );
}