"use server";

import { createSafeAction } from "@/lib/safe-actions";
import { InputType, ReturnType } from "./types";
import { AddFavourite } from "./schema";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, imageThumbUrl, boardId } = data;
  let favourite;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      return {
        error: "Board not found",
      };
    }

    const lastFavourite = await db.likes.findFirst({
      where: {
        userId,
        boardId: boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newFavourite = lastFavourite ? lastFavourite.order + 1 : 1;

    favourite = await db.likes.create({
      data: {
        title,
        boardId,
        userId: userId,
        imageThumbUrl: imageThumbUrl,
        actions: false,
        order: newFavourite,
      },
    });
  } catch (error: any) {
    console.log(error?.message);
    return {
      error: "Failed to add board favourite",
    };
  }

  return {
    data: favourite,
  };
};

export const addFavouriteBoard = createSafeAction(AddFavourite, handler);
