"use server";
import { db } from "@/lib/db";

export default async function getAllLabel(cardId: string | undefined) {
  try {
    const labels = await db.label.findMany({
      where: {
        cardId: cardId,
      },
    });

    return labels;
  } catch (error) {
    console.error("Error retrieving all label:", error);
    throw new Error("Failed to retrieve all label");
  }
}
