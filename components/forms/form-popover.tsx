"use client";

import { useAction } from "@/hooks/use-actions";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { createBoard } from "@/actions/createboard/main";
import { FormInputs } from "./form-input";
import { FormSubmits } from "./form-submit";

import React, { ElementRef, useRef } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
  children?: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

const FormPopover: React.FC<FormPopoverProps> = ({
  children,
  align,
  side,
  sideOffset,
}) => {
  const router = useRouter();
  const { fieldErrors, execute } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
      toast.success("Board created!");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    },
  });
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          align={align}
          className="w-80 pt-3"
          side={side}
          sideOffset={sideOffset}
        >
          <div className="text-sm font-medium text-center text-neutral-600 pb-4">
            Create board
          </div>
          <PopoverClose ref={closeRef} asChild>
            <Button
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-4">
              <FormPicker id="image" errors={fieldErrors} />
              <FormInputs
                id="title"
                label="Board title"
                type="text"
                errors={fieldErrors}
              />
            </div>
            <FormSubmits className="w-full">Create</FormSubmits>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FormPopover;
