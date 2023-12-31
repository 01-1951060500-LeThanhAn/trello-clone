import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short.",
    }),
  image: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .url({
      message: "Invalid image URL format",
    }),
  boardId: z.string(),
  listId: z.string(),
});
