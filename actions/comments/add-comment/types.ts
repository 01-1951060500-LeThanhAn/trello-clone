import { z } from "zod";

import { CreateComments } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { Comment } from "@prisma/client";

export type InputType = z.infer<typeof CreateComments>;
export type ReturnType = ActionState<InputType, Comment>;
