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
      className={className}
    >
      {children}
    </form>
  );
}