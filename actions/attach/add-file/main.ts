"use server";

import { createSafeAction } from "@/lib/safe-actions";
import { InputType, ReturnType } from "./types";
import { CreateAttachment } from "./schema";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { file, cardId, username } = data;
  let attachment;

  try {
    const board = await db.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!board) {
      return {
        error: "Card not found",
      };
    }
    attachment = await db.attachment.create({
      data: {
        file: file,
        cardId,
        userId: userId,
        username: username,
      },
    });
  } catch (error: any) {
    console.log(error?.message);
    return {
      error: "Failed to import attach ",
    };
  }

  return {
    data: attachment,
  };
};

export const createAttachment = createSafeAction(CreateAttachment, handler);
