import { ACTION, AuditLog } from "@prisma/client";

export const generateMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.COMMENT:
      return `added comment ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE_COMMENT:
      return `deleted comment ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `unknown action ${entityType.toLowerCase()}`;
  }
};
