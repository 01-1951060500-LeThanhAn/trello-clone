"use server";
import { db } from "@/lib/db";

export default async function getAllComments(cardId: string | undefined) {
  try {
    const comments = await db.comment.findMany({
      where: {
        cardId: cardId,
      },
    });

    return comments;
  } catch (error) {
    console.error("Error retrieving all comments:", error);
    throw new Error("Failed to retrieve all comments");
  }
}
