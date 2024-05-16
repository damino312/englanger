"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const HoverCardComponent = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover</HoverCardTrigger>
      <HoverCardContent></HoverCardContent>
    </HoverCard>
  );
};
