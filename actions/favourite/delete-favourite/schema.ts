import { z } from "zod";

export const DeleteFavourite = z.object({
  boardId: z.string(),
  id: z.string(),
});
