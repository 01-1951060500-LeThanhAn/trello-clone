"use client";
import { createComments } from "@/actions/comments/add-comment/main";
import getAllComments from "@/components/comments/get-comment";
import { FormInputs } from "@/components/forms/form-input";
import { FormSubmits } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-actions";
import { useUser } from "@clerk/nextjs";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const FormComment = ({
  cardId,

  setComments,
}: {
  cardId: string | undefined;
  comments: any[];
  setComments: (comments: any[]) => void;
}) => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const { execute: exeComment, fieldErrors } = useAction(createComments, {
    onSuccess: async () => {
      toast.success(`Created comment successfully`);

      try {
        const allComments = await getAllComments(cardId);
        setComments(allComments); // Cập nhật danh sách comments mới
      } catch (error: any) {
        toast.error(error);
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onComment = (formData: FormData) => {
    const content = formData.get(`content`) as string;

    exeComment({
      content,
      cardId: cardId as string,
      imageUrl: user.imageUrl,
      fullName: user?.fullName ? user.fullName : "",
    });
  };

  return (
    <>
      <div className="flex items-center">
        <div className="mr-3">
          <Image
            className="rounded-full"
            src={user.imageUrl}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <form action={onComment} className="relative w-full">
          <FormInputs
            id="content"
            placeholder="Write a comment..."
            className="h-10 "
            type="text"
            required
            errors={fieldErrors}
          />

          <FormSubmits
            variant="ghost"
            className="absolute bg-white top-0 right-0"
          >
            <SendIcon className="" role="button" type="submit" />
          </FormSubmits>
        </form>
      </div>
    </>
  );
};

export default FormComment;
