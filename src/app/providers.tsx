"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <Toaster />
        <main className="light text-foreground bg-background">{children}</main>
      </SessionProvider>
    </NextUIProvider>
  );
}
