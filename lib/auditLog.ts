import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface AuditProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: AuditProps) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found");
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId: props.entityId,
        entityTitle: props.entityTitle,
        entityType: props.entityType,
        action: props.action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: `${user.firstName} ${user.lastName}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
