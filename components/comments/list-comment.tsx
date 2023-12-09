"use client";
import React from "react";
import { useEffect } from "react";
import getAllComments from "./get-comment";
import CommentItem from "./comment-item";
import { CommentProps } from "@/interface";

function CommentList({
  cardId,
  comments,
  setComments,
}: {
  cardId: string | undefined;
  comments: any[];
  setComments: (comments: any[]) => void;
}) {
  useEffect(() => {
    async function fetchComments() {
      try {
        const allComments = await getAllComments(cardId);

        setComments(allComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, [cardId]);

  return (
    <>
      <div>
        {comments.map((item: CommentProps) => (
          <CommentItem
            setComments={setComments}
            comments={comments}
            key={item.id}
            cardId={cardId}
            item={item}
          />
        ))}
      </div>
    </>
  );
}

export default CommentList;
