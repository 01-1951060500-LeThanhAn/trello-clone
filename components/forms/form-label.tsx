"use client";
import React, { KeyboardEventHandler } from "react";
import { FormInputs } from "./form-input";
import { FormSubmits } from "./form-submit";
import FormPickColor from "./form-pickcolor";
import { useAction } from "@/hooks/use-actions";
import { createLabel } from "@/actions/label/create-label/main";
import { toast } from "sonner";
import useFunc from "@/hooks/useFunc";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormErrors from "./form-error";

const FormLabel = ({ cardId }: { cardId: string }) => {
  const { disableEditing, onKeydown, formRef, inputRef } = useFunc();
  const { execute: exeCreateLabel, fieldErrors } = useAction(createLabel, {
    onSuccess: (data) => {
      toast.success("Label created!");
      disableEditing();
    },
    onError: (error) => {
      console.log({ error });
      toast.error("Label create failed");
    },
  });

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeydown);

  const onSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const color = formData.get("color") as string;

    await exeCreateLabel({ name, color, cardId });
  };

  return (
    <>
      <div className="">
        <p className="text-center">Stick Label</p>
        <form ref={formRef} action={onSubmit} className="space-y-4">
          <div className="">
            <FormPickColor id="color" errors={fieldErrors} />
            <FormInputs
              errors={fieldErrors}
              id="name"
              label="Label title"
              type="text"
              ref={inputRef}
            />
          </div>
          <FormSubmits className="w-full">Create label</FormSubmits>
        </form>
        <FormErrors id="name" errors={fieldErrors} />
      </div>
    </>
  );
};

export default FormLabel;
