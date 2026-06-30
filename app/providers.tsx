"use client";

import "@/i18n";

import ReduxProvider from "@/store/provider";
import { ThemeProvider } from "@/theme";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}