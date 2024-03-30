"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster />
      <main className="light text-foreground bg-background">{children}</main>
    </NextUIProvider>
  );
}
