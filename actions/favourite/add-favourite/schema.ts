import { z } from "zod";

export const AddFavourite = z.object({
  boardId: z.string(),
  imageThumbUrl: z.string(),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }),
});
