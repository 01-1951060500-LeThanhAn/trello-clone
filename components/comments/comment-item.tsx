"use client";
import { CommentProps } from "@/interface";
import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import { useAction } from "@/hooks/use-actions";
import { deleteComment } from "@/actions/comments/delete-comment/main";
import { toast } from "sonner";
import { Button } from "../ui/button";
import useFunc from "@/hooks/useFunc";
import { useUser } from "@clerk/nextjs";
import { FormInputs } from "../forms/form-input";
import { replyComments } from "@/actions/comments/reply-comment/main";
import { FormSubmits } from "../forms/form-submit";
import { SendIcon } from "lucide-react";
import { ReplyComment } from "@prisma/client";
import ListReplyComment from "./list-reply-comment";
import getReplyComments from "./get-reply-comment";
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

  if (!user) {
    return null;
  }
  const [repliesComment, setRepliesComment] = useState<ReplyComment[]>([]);
  const [show, setShow] = useState(false);
  const { disableEditing, enableEditing, isEditing } = useFunc();
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

  const { execute: exeReplyComment, fieldErrors } = useAction(replyComments, {
    onSuccess: async () => {
      toast.success(`Replied comment successfully`);

      try {
        const allComments = await getReplyComments(item.id);
        setRepliesComment(allComments);
      } catch (error: any) {
        toast.error(error);
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onDeleteComment = () => {
    exeDeleteComment({ id: item.id, cardId: cardId as any });
  };

  const onReplyComment = (formData: FormData) => {
    const content = formData.get(`content`) as string;

    exeReplyComment({
      content,
      commentId: item.id as string,
      imageUrl: user.imageUrl,
      fullName: user?.fullName ? user.fullName : "",
    });

    setShow(false);
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
              onClick={() => setShow(!show)}
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

      <ListReplyComment
        commentId={item.id}
        repliesComment={repliesComment}
        setRepliesComment={setRepliesComment}
      />

      {show && (
        <div className="flex items-center ml-8">
          <div className="w-[13%] xl:pl-9">
            <Image
              src={user?.imageUrl ? user.imageUrl : ""}
              alt=""
              className="w-8 h-8 object-cover rounded-full"
              width={30}
              height={30}
            />
          </div>
          <form action={onReplyComment} className="w-full relative">
            <FormInputs
              className=" w-[100%] h-10 py-4 flex-grow" // Sử dụng flex-grow để input chiếm hết phần còn lại
              type="text"
              placeholder="Reply a comment..."
              id="content"
              errors={fieldErrors}
            />

            <FormSubmits
              variant="ghost"
              className="absolute bg-transparent top-0 right-0"
            >
              <SendIcon className="" role="button" type="submit" />
            </FormSubmits>
          </form>
        </div>
      )}
    </>
  );
};

export default CommentItem;
