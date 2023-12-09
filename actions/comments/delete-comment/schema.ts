import { z } from "zod";

export const DeleteComments = z.object({
  cardId: z.string(),
  id: z.string(),
});
