import { z } from "zod";

import { ReplyComments } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { ReplyComment } from "@prisma/client";

export type InputType = z.infer<typeof ReplyComments>;
export type ReturnType = ActionState<InputType, ReplyComment>;
