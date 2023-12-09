"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { DeleteComments } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, cardId } = data;
  let comment;

  try {
    comment = await db.comment.delete({
      where: {
        id,
        cardId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete comment",
    };
  }

  revalidatePath(`/board/${cardId}`);
  return {
    data: comment,
  };
};

export const deleteComment = createSafeAction(DeleteComments, handler);
