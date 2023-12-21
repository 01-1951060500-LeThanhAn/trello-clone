import { ReplyComment } from "@prisma/client";
import { NextPage } from "next";
import React, { useEffect } from "react";

import ReplyCommentItem from "./reply-comment-item";
import getReplyComments from "./get-reply-comment";
interface ReplyCommentProps {
  repliesComment: ReplyComment[];
  setRepliesComment: (repliesComment: ReplyComment[]) => void;
  commentId: string;
}
const ListReplyComment: NextPage<ReplyCommentProps> = ({
  repliesComment,
  setRepliesComment,
  commentId,
}) => {
  useEffect(() => {
    async function fetchReplyComments() {
      try {
        const allComments = await getReplyComments(commentId);

        setRepliesComment(allComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchReplyComments();
  }, [commentId]);

  return (
    <>
      <div>
        {repliesComment.map((item) => (
          <ReplyCommentItem
            repliesComment={repliesComment}
            setRepliesComment={setRepliesComment}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </>
  );
};

export default ListReplyComment;
