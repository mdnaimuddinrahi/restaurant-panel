import { useController, useFormContext, FieldValues, Path } from "react-hook-form";
import AppSelect, { AppSelectProps, SelectOption } from "./AppSelect";

type FormSelectProps<T extends FieldValues> = Omit<
  AppSelectProps<SelectOption>,
  "value" | "onChange" | "error"
> & {
  name: Path<T>;
};

export default function FormSelect<T extends FieldValues>({
  name,
  options,
  ...props
}: FormSelectProps<T>) {
  const { control } = useFormContext<T>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
const opts = options as SelectOption[];

const selected =
  opts.find((o) => o.value === field.value) ?? null;

  return (
    <AppSelect<SelectOption>
      {...props}
      options={options}
      value={selected}
      onChange={(option) => field.onChange(option?.value)}
      onBlur={field.onBlur}
      error={error?.message}
    />
  );
}