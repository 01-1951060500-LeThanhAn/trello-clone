"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FormSubmitProps {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "primary";
}

export const FormSubmits: React.FC<FormSubmitProps> = ({
  children,
  disabled,
  className,
  variant,
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        className={className}
        disabled={pending || disabled}
        type="submit"
        variant={variant}
      >
        {children}
      </Button>
    </>
  );
};
