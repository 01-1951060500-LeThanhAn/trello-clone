"use client";
import React from "react";
import FormWrapper from "./form-wrapper";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInputs } from "@/components/forms/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmits } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import { createTitleBoard } from "@/actions/create-listboard/main";
import { toast } from "sonner";
import useFunc from "@/hooks/useFunc";

const FormList = () => {
  const { disableEditing, formRef, isEditing, inputRef, enableEditing } =
    useFunc();
  const params = useParams();
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createTitleBoard, {
    onSuccess: (data) => {
      toast.success(`Create ${data.title} board successfully`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({ title, boardId });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);
  if (isEditing) {
    return (
      <FormWrapper>
        <form
          action={onSubmit}
          className="w-full  bg-white space-y-4 shadow-md"
          ref={formRef}
        >
          <FormInputs
            errors={fieldErrors}
            placeholder="Enter list title here..."
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-11 font-sans border-transparent hover:border-input focus:border-input transition"
          />

          <input name="boardId" hidden value={params?.boardId} />
          <div className="flex items-center gap-x-1 pb-3 px-2">
            <FormSubmits>Add List</FormSubmits>
            <Button
              size="sm"
              variant={"primary"}
              className=""
              onClick={disableEditing}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </FormWrapper>
    );
  }

  return (
    <>
      <FormWrapper>
        <form
          className="w-full  bg-white space-y-4 shadow-md"
          action="
        "
        >
          <button
            onClick={enableEditing}
            className="w-full rounded-sm bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
          >
            <Plus className="w-4 h- mr-3" />
            Add a list
          </button>
        </form>
      </FormWrapper>
    </>
  );
};

export default FormList;
