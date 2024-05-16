import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PopoverProps {
  children: React.ReactNode;
  btnName: string;
  btnClassName?: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function PopoverComponent({
  children,
  btnName,
  side,
  btnClassName,
}: PopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={btnClassName}>{btnName}</button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side={side}>
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default PopoverComponent;
