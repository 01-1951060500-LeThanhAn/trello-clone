import { z } from "zod";

export const CreateLabel = z.object({
  cardId: z.string(),
  color: z.string(),
  name: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }),
});
