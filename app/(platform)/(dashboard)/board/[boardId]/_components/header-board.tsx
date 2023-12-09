"use client";
import { updateLIist } from "@/actions/update-listboard/main";
import { FormInputs } from "@/components/forms/form-input";
import { useAction } from "@/hooks/use-actions";
import useFunc from "@/hooks/useFunc";
import { List } from "@prisma/client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import OptionList from "./option-list";
const ListHeader = ({
  data,
  onAddCard,
}: {
  data: List;
  onAddCard: () => void;
}) => {
  const [title, setTitle] = useState(data.title);
  const { formRef, isEditing, inputRef, enableEditing, disableEditing } =
    useFunc();
  const { execute, fieldErrors } = useAction(updateLIist, {
    onSuccess: (data) => {
      toast.success(`Update ${data.title} successfully`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title, id, boardId });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  useEventListener("keydown", onKeyDown);

  return (
    <>
      <div className=" text-sm gap-x-2 font-semibold flex items-start justify-between ">
        {isEditing ? (
          <form
            ref={formRef}
            action={onSubmit}
            className="flex-1 px-1 font-medium border-transparent hover:border-input focus:border-inherit transition truncate bg-transparent focus:bg-white"
          >
            <input hidden id="id" name="id" value={data.id} />
            <input hidden id="boardId" name="boardId" value={data.boardId} />
            <FormInputs
              className="text-sm w-full px-2 py-1 h-7"
              defaultVal={title!}
              ref={inputRef}
              onBlur={onBlur}
              id="title"
              placeholder="Enter title..."
              errors={fieldErrors}
            />

            <button type="submit" hidden></button>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className="w-full text-sm px2 py-1 h-7 font-medium border-transparent"
          >
            {title}
          </div>
        )}
        <OptionList onAddCard={onAddCard} data={data} />
      </div>
    </>
  );
};

export default ListHeader;
