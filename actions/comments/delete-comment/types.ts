import { z } from "zod";

import { DeleteComments } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { Comment } from "@prisma/client";

export type InputType = z.infer<typeof DeleteComments>;
export type ReturnType = ActionState<InputType, Comment>;
