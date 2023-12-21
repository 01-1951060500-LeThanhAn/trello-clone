import { z } from "zod";

export const ReplyComments = z.object({
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content is required",
  }),
  commentId: z.string(),
  imageUrl: z.string(),
  fullName: z.string(),
});
