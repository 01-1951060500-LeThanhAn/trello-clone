import { z } from "zod";

export const CreateComments = z.object({
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content is required",
  }),
  cardId: z.string(),
  imageUrl: z.string(),
  fullName: z.string(),
});
