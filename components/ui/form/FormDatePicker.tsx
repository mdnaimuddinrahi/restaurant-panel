import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

import DatePicker, {
  AppDatePickerProps,
} from "../input/DatePicker";

type FormDatePickerProps<T extends FieldValues> = Omit<
  AppDatePickerProps,
  "value" | "onChange" | "error"
> & {
  name: Path<T>;
};

export default function FormDatePicker<
  T extends FieldValues
>({
  name,
  ...props
}: FormDatePickerProps<T>) {
  const { control } = useFormContext<T>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  console.log('field.value', field.value)

  return (
    <DatePicker
      {...props}
      name={name}
      value={field.value ?? null}
      onChange={(date) => field.onChange(date)}
      error={error?.message}
    />
  );
}