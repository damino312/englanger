import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/app/_components/ui/hover-card";
import useTimeout from "@/hooks/useTimeout";

interface HoverCardProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  isContentHidden?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  isHover?: boolean;
}

const HoverCardComponent = ({
  children,
  triggerClassName,
  trigger,
  isContentHidden = false,
  side = "right",
  isHover,
}: HoverCardProps) => {
  const openDelay = 700;
  const closeDelay = 300;
  const [isOpen, setIsOpen] = useState(false);
  const { reset: resetOpenTimeout, clear: clearOpenTimeout } = useTimeout(
    () => setIsOpen(true),
    openDelay
  );
  const { reset: resetCloseTimeout, clear: clearCloseTimeout } = useTimeout(
    () => setIsOpen(false),
    closeDelay
  );

  useEffect(() => {
    if (isHover) {
      resetOpenTimeout();
      clearCloseTimeout();
    } else {
      clearOpenTimeout();
      resetCloseTimeout();
    }
  }, [
    isHover,
    resetOpenTimeout,
    clearOpenTimeout,
    clearCloseTimeout,
    resetCloseTimeout,
  ]);

  return (
    <HoverCard open={isOpen}>
      <HoverCardTrigger className={triggerClassName}>
        {trigger}
      </HoverCardTrigger>
      {!isContentHidden && (
        <HoverCardContent side={side}>{children}</HoverCardContent>
      )}
    </HoverCard>
  );
};

export default HoverCardComponent;
