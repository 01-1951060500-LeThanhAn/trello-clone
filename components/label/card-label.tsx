"use server";
import { db } from "@/lib/db";

export default async function getAllLabel(cardId: string) {
  try {
    const labels = await db.card.findUnique({
      where: {
        id: cardId,
      },
      include: {
        labels: true,
      },
    });

    return labels;
  } catch (error) {
    console.error("Error retrieving all label:", error);
    throw new Error("Failed to retrieve all label");
  }
}
