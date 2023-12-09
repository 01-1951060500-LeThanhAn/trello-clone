import { ActionState } from "./../../lib/safe-actions";
import { z } from "zod";
import { List } from "@prisma/client";
import { DeleteList } from "./schema";

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
