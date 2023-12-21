"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { DeleteReplyComments } from "./schema";
import { createAuditLog } from "@/lib/auditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, commentId } = data;
  let comment;

  try {
    comment = await db.replyComment.delete({
      where: {
        id,
        commentId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete comment",
    };
  }

  return {
    data: comment,
  };
};

export const deleteReplyComment = createSafeAction(
  DeleteReplyComments,
  handler
);
