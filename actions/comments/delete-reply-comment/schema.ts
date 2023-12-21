import { z } from "zod";

export const DeleteReplyComments = z.object({
  commentId: z.string(),
  id: z.string(),
});
