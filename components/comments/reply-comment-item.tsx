"use client";
import { ReplyComment } from "@prisma/client";
import moment from "moment";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import useFunc from "@/hooks/useFunc";
import { useAction } from "@/hooks/use-actions";
import { deleteReplyComment } from "@/actions/comments/delete-reply-comment/main";
import { toast } from "sonner";
interface ReplyItemCommentProps {
  item: ReplyComment;
  repliesComment: ReplyComment[];
  setRepliesComment: (repliesComment: ReplyComment[]) => void;
}

const ReplyCommentItem: NextPage<ReplyItemCommentProps> = ({
  item,
  repliesComment,
  setRepliesComment,
}) => {
  const { isEditing } = useFunc();
  const { user } = useUser();
  if (!user) {
    return null;
  }

  const { execute: exeDeleteReplyComment } = useAction(deleteReplyComment, {
    onSuccess: (data) => {
      toast.success("Deleted reply comment");
      setRepliesComment(repliesComment.filter((data) => data.id !== item.id));
    },
    onError: (err) => {
      toast.error("Delete failed");
    },
  });

  const onDeleteReplyComment = async () => {
    await exeDeleteReplyComment({
      id: item.id,
      commentId: item.commentId as string,
    });
  };

  return (
    <>
      <div className="flex pl-10">
        <div className="">
          <Image
            src={item.imageUrl!}
            alt="avatar"
            className="w-7 h-7 object-cover rounded-full"
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
                onClick={onDeleteReplyComment}
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

export default ReplyCommentItem;
