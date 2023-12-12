"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/safe-actions";
import { DeleteFavourite } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;
  let favourite;

  try {
    favourite = await db.likes.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete title board",
    };
  }

  return {
    data: favourite,
  };
};

export const deleteFavouriteBoard = createSafeAction(DeleteFavourite, handler);
