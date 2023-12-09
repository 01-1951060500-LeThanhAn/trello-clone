"use client";

import FormErrors from "@/components/forms/form-error";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormTextAreaProps } from "@/interface";
import React, { forwardRef } from "react";

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultVal,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    return (
      <>
        <div className="space-y-2 w-full">
          <div className="space-y-1 w-full">
            {label ? (
              <Label
                htmlFor={id}
                className="text-xs font-semibold text-neutral-700"
              >
                {label}
              </Label>
            ) : null}
            <Textarea
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              onClick={onClick}
              defaultValue={defaultVal}
              ref={ref}
              required={required}
              placeholder={placeholder}
              id={id}
              name={id}
              disabled={disabled}
              className={`resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 shadow-sm outline-none`}
            />
          </div>
          <FormErrors id={id as string} errors={errors} />
        </div>
      </>
    );
  }
);

FormTextArea.displayName = "FormTextArea";
