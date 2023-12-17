import { z } from "zod";

export const CreateAttachment = z.object({
  cardId: z.string(),
  username: z.string(),
  userId: z.string(),
  file: z.string(),
});
