import { ActionState } from "./../../lib/safe-actions";
import { z } from "zod";
import { Board } from "@prisma/client";
import { CreateBoard } from "./schema";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;
