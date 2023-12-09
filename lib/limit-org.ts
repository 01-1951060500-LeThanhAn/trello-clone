import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { MAX_FREE_BOARDS } from "@/constant/images";

export const incrementCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return;
  }

  const orgLimit = await db.limitOrg.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.limitOrg.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    db.limitOrg.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decrementCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return;
  }

  const orgLimit = await db.limitOrg.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.limitOrg.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    db.limitOrg.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const limitOrg = await db.limitOrg.findUnique({
    where: { orgId },
  });

  if (!limitOrg || limitOrg.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }

  const getLimit = await db.limitOrg.findUnique({
    where: { orgId },
  });
  if (!getLimit) {
    return 0;
  }

  return getLimit.count;
};
