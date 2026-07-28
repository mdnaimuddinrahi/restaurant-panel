import { ReactNode } from "react";

interface AppFormProps {
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}

export default function AppForm({
  children,
  onSubmit,
  className = "",
}: AppFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`
        grid
        h-[calc(100vh-120px)]
        grid-cols-1
        lg:grid-cols-[320px_1fr]
        gap-4
        ${className}
      `}
    >
      {children}
    </form>
  );
}