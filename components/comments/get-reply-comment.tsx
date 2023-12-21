"use server";
import { db } from "@/lib/db";

export default async function getReplyComments(commentId: string | undefined) {
  try {
    const comments = await db.replyComment.findMany({
      where: {
        commentId: commentId,
      },
    });

    return comments;
  } catch (error) {
    console.error("Error retrieving all comments:", error);
    throw new Error("Failed to retrieve all comments");
  }
}
