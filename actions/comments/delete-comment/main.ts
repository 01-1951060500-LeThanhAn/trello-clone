"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { DeleteComments } from "./schema";
import { createAuditLog } from "@/lib/auditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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
    await createAuditLog({
      entityId: cardId,
      entityTitle: comment.content,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE_COMMENT,
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
