"use client";

import { updateBoard } from "@/actions/update-board/main";
import { FormInputs } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import useFunc from "@/hooks/useFunc";
import { useAction } from "@/hooks/use-actions";
import { Board } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "sonner";

interface BoardTitleProps {
  data: Board;
}

const BoardTitleForm: React.FC<BoardTitleProps> = ({ data }) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [title, setTitle] = useState(data.title);
  const { formRef, isEditing, inputRef, enableEditing } = useFunc();

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (!isEditing) {
    return (
      <>
        <form
          ref={formRef}
          action={onSubmit}
          className="flex items-center gap-x-2"
        >
          <FormInputs
            className="text-base border-none focus-visible:ring-transparent font-bold px-[8px] h-7 bg-transparent focus-visible:outline-none"
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultVal={title}
          />
        </form>
      </>
    );
  }
  return (
    <>
      <Button
        onClick={enableEditing}
        variant="primary"
        className="font-bold text-lg h-auto p-1 px-2"
      >
        {title}
      </Button>
    </>
  );
};

export default BoardTitleForm;
