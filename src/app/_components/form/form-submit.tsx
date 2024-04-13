"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        disabled={pending || disabled}
        type="submit"
        variant={variant}
        className={className}
      >
        {children}
      </Button>
    </>
  );
};
