"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { UpdateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, items } = data;
  let orders;

  try {
    const trans = items.map((item) =>
      db.list.update({
        where: {
          id: item.id,
          board: {
            orgId,
          },
        },
        data: {
          order: item.order,
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

export const updateOrder = createSafeAction(UpdateCard, handler);
