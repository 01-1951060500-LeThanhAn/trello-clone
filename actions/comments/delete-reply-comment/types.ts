import { z } from "zod";

import { DeleteReplyComments } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { ReplyComment } from "@prisma/client";

export type InputType = z.infer<typeof DeleteReplyComments>;
export type ReturnType = ActionState<InputType, ReplyComment>;
