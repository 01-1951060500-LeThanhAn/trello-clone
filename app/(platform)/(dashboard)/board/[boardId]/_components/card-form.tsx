"use client";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import React, { KeyboardEventHandler, forwardRef, useState } from "react";
import { FormTextArea } from "./textarea-form";
import { FormSubmits } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-actions";
import { createCards } from "@/actions/card/create-card/main";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import useFunc from "@/hooks/useFunc";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
interface CardFormProps {
  disableEditing: () => void;
  enableTextAreaEditing: () => void;
  listId: string;
  isEditing: boolean;
}
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, isEditing, listId, enableTextAreaEditing }, ref) => {
    const params = useParams();
    const { formRef, onKeydown } = useFunc();

    const { execute, fieldErrors } = useAction(createCards, {
      onSuccess: (data) => {
        toast.success(`Created card ${data.title} in this board`);
        disableEditing();
      },
      onError: (err) => {
        toast.error(err);
      },
    });

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeydown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <>
          <form action={onSubmit} className="m-1 py-1 space-y-4">
            <FormTextArea
              errors={fieldErrors}
              id="title"
              onKeyDown={onTextareaKeyDown}
              ref={ref}
              placeholder="Enter a title for this card..."
            />
            <input hidden id="listId" name="listId" value={listId} />
            <div className="flex items-center gap-x-1">
              <FormSubmits>Add Card</FormSubmits>
              <Button onClick={disableEditing} size="sm" variant={"ghost"}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </>
      );
    }
    return (
      <>
        <div className="pt-2 px-2 flex items-center">
          <Button
            variant={"ghost"}
            onClick={enableTextAreaEditing}
            className="h-auto w-full justify-start text-muted-foreground text-sm"
          >
            <Plus className="w-4 h-4" />
            <p className="ml-2">Add a card</p>
          </Button>
        </div>
      </>
    );
  }
);

CardForm.displayName = "CardForm";
