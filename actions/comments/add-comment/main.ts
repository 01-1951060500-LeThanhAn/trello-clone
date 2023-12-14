"use server";

import { createSafeAction } from "@/lib/safe-actions";
import { InputType, ReturnType } from "./types";
import { CreateComments } from "./schema";
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

  const { content, cardId, fullName, imageUrl } = data;
  let comments;

  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      return {
        error: "Card not found",
      };
    }

    const lastComment = await db.comment.findFirst({
      where: {
        cardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastComment ? lastComment.order + 1 : 1;

    comments = await db.comment.create({
      data: {
        content,
        cardId,
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
      error: "Failed to create title comment",
    };
  }

  return {
    data: comments,
  };
};

export const createComments = createSafeAction(CreateComments, handler);
