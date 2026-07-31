// AppForm.tsx
import { ReactNode, useId } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import AppCustomButton from "../button/AppCustomButton";
import { cn } from "@/lib/utils";

interface AppFormProps<TFieldValues extends FieldValues = FieldValues> {
   methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: ReactNode;
  className?: string;
  id?: string;

  // Layout
  bodyClassName?: string;
  footerClassName?: string;

  // Footer
  showFooter?: boolean;

  // Reset Button
  showReset?: boolean;
  resetText?: ReactNode;
  onReset?: () => void;

  // Submit Button
  showSubmit?: boolean;
  submitText?: ReactNode;
  submitLoading?: boolean;
  submitDisabled?: boolean;
  submitVariant?: "solid" | "outline" | "ghost" | "danger";
}

export default function AppForm<
  TFieldValues extends FieldValues = FieldValues
>({
  methods,
  onSubmit,

  children,
  className,
  id,

  bodyClassName,
  footerClassName,

  showFooter = true,

  showReset = true,
  resetText = "Reset",
  onReset,

  showSubmit = true,
  submitText = "Save",
  submitLoading = false,
  submitDisabled = false,
  submitVariant = "solid",
}: AppFormProps<TFieldValues>) {
  const formId = useId();

  return (
    <FormProvider {...methods}>
      <form
        id={id ?? formId}
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("flex h-full min-h-0 flex-col", className)}
      >
        {/* Body */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-6",
            bodyClassName
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800",
              footerClassName
            )}
          >
            {showReset && (
              <AppCustomButton
                type="button"
                variant="outline"
                onClick={onReset}
                className="text-sm px-5 py-2.5"
              >
                {resetText}
              </AppCustomButton>
            )}

            {showSubmit && (
              <AppCustomButton
                type="submit"
                variant={submitVariant}
                loading={submitLoading}
                disabled={submitDisabled}
                className="text-sm  px-5 py-2.5 text-white disabled:opacity-50"
              >
                {submitText}
              </AppCustomButton>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}