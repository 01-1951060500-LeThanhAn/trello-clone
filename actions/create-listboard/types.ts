import { ActionState } from "./../../lib/safe-actions";
import { z } from "zod";
import { List } from "@prisma/client";
import { CreateListBoardTitle } from "./schema";

export type InputType = z.infer<typeof CreateListBoardTitle>;
export type ReturnType = ActionState<InputType, List>;
