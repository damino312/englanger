import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayLocalDate(date: Date) {
  return date.toLocaleString("ru-RU", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}
