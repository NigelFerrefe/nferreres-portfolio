"use client";

import { ThemeProvider } from "next-themes";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ProgressProvider height="4px" color="#a8561a" options={{ showSpinner: false }} shallowRouting>
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
}