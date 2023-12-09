"use client";

import { updateCardTitle } from "@/actions/update-titlecard/main";
import { FormTextArea } from "@/app/(platform)/(dashboard)/board/[boardId]/_components/textarea-form";
import { FormSubmits } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import useFunc from "@/hooks/useFunc";
import { CardLists } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
interface DescriptionProps {
  data: CardLists;
}

const Description: React.FC<DescriptionProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const {
    isEditing,
    setEditing,
    textAreaRef,
    formRef,
    enableTextAreaEditing,
    disableEditing,
    onKeydown,
  } = useFunc();
  const { execute, fieldErrors } = useAction(updateCardTitle, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card ${data.title} updated`);
      disableEditing();
    },
    onError: (err) => toast.error(err),
  });

  const params = useParams();

  useEventListener("keydown", onKeydown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  return (
    <>
      <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-1 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold mt-1 text-neutral-700">Description</p>
          {isEditing ? (
            <form action={onSubmit} ref={formRef} className="space-y-2">
              <FormTextArea
                id="description"
                className="w-full mt-2"
                placeholder="Add a more desciption"
                defaultVal={data.description || undefined}
                errors={fieldErrors}
                ref={textAreaRef}
              />
              <div className="flex items-center gap-x-2">
                <FormSubmits>Save</FormSubmits>
                <Button
                  type="button"
                  onClick={disableEditing}
                  size="sm"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div
              onClick={enableTextAreaEditing}
              className="min-h-20  mt-2 bg-neutral-200 text-sm font-medium py-3 px-3 rounded-md"
              role="button"
            >
              {data.description || "Add a more description here..."}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Description;
