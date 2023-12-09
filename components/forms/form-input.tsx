"use client";

import { FormInputProps } from "@/interface";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormErrors from "./form-error";

export const FormInputs = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      required,
      disabled,
      type,
      placeholder,
      className,
      onBlur,
      errors,
      defaultVal,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <>
        <div className="space-y-2">
          <div className="space-y-1">
            {label ? (
              <Label
                htmlFor={id}
                className={`text-base font-semibold text-neutral-700`}
                typeof={type}
              >
                {label}
              </Label>
            ) : null}
            <Input
              onBlur={onBlur}
              defaultValue={defaultVal}
              ref={ref}
              className={`text-sm px-2 py-1 h-7 ${className}`}
              id={id}
              name={id}
              type={type}
              disabled={disabled || pending}
              required={required}
              placeholder={placeholder}
            />
          </div>

          <FormErrors id={id!} errors={errors} />
        </div>
      </>
    );
  }
);

FormInputs.displayName = "FormInputs";
