"use client";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/app/_components/ui/hover-card";

interface HoverCardProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  isContentHidden?: boolean;
  side?: "top" | "right" | "bottom" | "left";
}

export function HoverCardDemo({
  children,
  triggerClassName,
  trigger,
  isContentHidden = false,
  side = "right",
}: HoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className={triggerClassName}>
        {trigger}
      </HoverCardTrigger>
      {!isContentHidden && (
        <HoverCardContent side={side}>{children}</HoverCardContent>
      )}
    </HoverCard>
  );
}
