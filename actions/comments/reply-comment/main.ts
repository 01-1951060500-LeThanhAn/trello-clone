"use server";

import { createSafeAction } from "@/lib/safe-actions";
import { InputType, ReturnType } from "./types";
import { ReplyComments } from "./schema";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/auditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { content, commentId, fullName, imageUrl } = data;
  let comments;

  try {
    const card = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!card) {
      return {
        error: "Comment not found",
      };
    }

    const lastComment = await db.replyComment.findFirst({
      where: {
        commentId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastComment ? lastComment.order + 1 : 1;

    comments = await db.replyComment.create({
      data: {
        content,
        commentId,
        order: newOrder,
        userId: userId,
        imageUrl: imageUrl,
        fullName: fullName,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: comments.content,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.COMMENT,
    });
  } catch (error: any) {
    console.log(error?.message);
    return {
      error: "Failed to create reply comment",
    };
  }

  return {
    data: comments,
  };
};

export const replyComments = createSafeAction(ReplyComments, handler);
