import { FieldValues, Path, useController, useFormContext } from "react-hook-form";
import TextArea from "../input/TextArea";

interface FormTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

export default function FormTextArea<T extends FieldValues>({
   name,
   ...props    
}: FormTextAreaProps<T>) {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    
    return (
        <TextArea
            {...props}
            {...field}
            value={field.value ?? ''}
            error={error?.message}
        />
    )
    return <></>;
}