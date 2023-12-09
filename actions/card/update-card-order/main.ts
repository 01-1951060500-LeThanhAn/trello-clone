"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let orders;

  try {
    const trans = items.map((item) =>
      db.card.update({
        where: {
          id: item.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: item.order,
          listId: item.listId,
        },
      })
    );

    orders = await db.$transaction(trans);
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update title orders",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: orders,
  };
};

export const updateOrderCard = createSafeAction(UpdateCardOrder, handler);
