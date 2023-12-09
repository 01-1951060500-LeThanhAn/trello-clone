"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { CopyList } from "./schema";
import { createAuditLog } from "@/lib/auditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    const listCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listCopy) {
      return {
        error: "List not found",
      };
    }

    const listLasts = await db.list.findFirst({
      where: { boardId },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = listLasts ? listLasts?.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listCopy.boardId,
        title: `${listCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title!,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to copy title board",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const copyBoardList = createSafeAction(CopyList, handler);
