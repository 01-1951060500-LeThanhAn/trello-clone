"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/safe-actions";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/auditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasCount, incrementCount } from "@/lib/limit-org";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const canCreate = await hasCount();

  if (!canCreate) {
    return {
      error: `You can have create 5 boards in this organization`,
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageUsername, imageLinkHTML] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUsername ||
    !imageLinkHTML
  ) {
    return {
      error: "Missing fields. Failed to create board",
    };
  }
  let board;
  try {
    board = await db?.board.create({
      data: {
        orgId,
        title,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUsername,
        imageLinkHTML,
      },
    });

    await incrementCount();

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
