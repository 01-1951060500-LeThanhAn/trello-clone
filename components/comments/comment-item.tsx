"use client";
import { CommentProps } from "@/interface";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { useAction } from "@/hooks/use-actions";
import { deleteComment } from "@/actions/comments/delete-comment/main";
import { toast } from "sonner";
import { Button } from "../ui/button";
import useFunc from "@/hooks/useFunc";
import { useUser } from "@clerk/nextjs";
interface ItemCommentProps {
  item: CommentProps;
  cardId: string | undefined;
  setComments: (comments: any[]) => void;
  comments: any[];
}

const CommentItem: React.FC<ItemCommentProps> = ({
  item,
  cardId,
  comments,
  setComments,
}) => {
  const { user } = useUser();

  const { disableEditing, isEditing } = useFunc();
  const { execute: exeDeleteComment } = useAction(deleteComment, {
    onSuccess: () => {
      toast.success(`Deleted ${item.content} success`);
      disableEditing();
      setComments(comments.filter((comment) => comment.id !== item.id));
    },
    onError: (err) => {
      toast.error(err);
      disableEditing();
    },
  });

  const onDeleteComment = () => {
    exeDeleteComment({ id: item.id, cardId: cardId as any });
  };
  return (
    <>
      <div className="flex my-2">
        <div className="">
          <Image
            src={item.imageUrl!}
            alt="avatar"
            className="w-8 h-8 object-cover rounded-full"
            width={30}
            height={30}
          />
        </div>

        <div className="w-full ml-3">
          <div className="flex items-center mb-1">
            <p className="font-semibold text-sm">{item.fullName}</p>
            <p className="text-xs text-neutral-400 ml-2">
              {moment(item.createdAt).fromNow()}
            </p>
          </div>

          <div className="truncate  py-2 px-3 text-sm rounded-md shadow-md  border-transparent hover:border-black bg-neutral-100">
            <p className="w-full">{item.content}</p>
          </div>

          <div className="flex items-center">
            <Button
              className="text-xs hover:bg-transparent  bg-transparent text-black"
              role="button"
            >
              Like
            </Button>
            <Button
              className="text-xs hover:bg-transparent   bg-transparent text-black"
              role="button"
            >
              Reply
            </Button>
            {user?.id === item.userId && (
              <Button
                onClick={onDeleteComment}
                className="text-xs hover:bg-transparent   bg-transparent text-black"
                role="button"
                disabled={isEditing}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
