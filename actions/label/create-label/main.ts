"use server";

import { createSafeAction } from "@/lib/safe-actions";
import { InputType, ReturnType } from "./types";
import { CreateLabel } from "./schema";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, color, cardId } = data;
  let label;

  try {
    const board = await db.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!board) {
      return {
        error: "Board not found",
      };
    }
    label = await db.label.create({
      data: {
        name: name,
        cardId,
        userId: userId,
        color: color,
      },
    });
  } catch (error: any) {
    console.log(error?.message);
    return {
      error: "Failed to create label ",
    };
  }

  return {
    data: label,
  };
};

export const createLabel = createSafeAction(CreateLabel, handler);
