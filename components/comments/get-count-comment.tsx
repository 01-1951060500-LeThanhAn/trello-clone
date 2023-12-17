"use server";
import { db } from "@/lib/db";

export default async function getCountComment(cardId: string | undefined) {
  try {
    const comments = await db.card.findMany({
      where: {
        id: cardId,
      },
      include: {
        comments: true,
      },
    });

    return comments;
  } catch (error) {
    console.error("Error retrieving all comments:", error);
    throw new Error("Failed to retrieve all comments");
  }
}
