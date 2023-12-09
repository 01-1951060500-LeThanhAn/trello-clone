"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { UpdateCardTitle } from "./schema";
import { createAuditLog } from "@/lib/auditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, id, ...values } = data;
  let cardTitle;

  try {
    cardTitle = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });

    await createAuditLog({
      entityId: cardTitle.id,
      entityTitle: cardTitle.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update title board",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: cardTitle,
  };
};

export const updateCardTitle = createSafeAction(UpdateCardTitle, handler);
