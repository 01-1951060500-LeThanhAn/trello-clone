"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/safe-actions";
import { DeleteLabel } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, cardId } = data;
  let label;

  try {
    label = await db.label.delete({
      where: {
        id: id,
        cardId: cardId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete title label",
    };
  }

  return {
    data: label,
  };
};

export const deleteLabel = createSafeAction(DeleteLabel, handler);
