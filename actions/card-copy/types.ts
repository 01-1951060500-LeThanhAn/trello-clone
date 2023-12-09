import { ActionState } from "../../lib/safe-actions";
import { z } from "zod";
import { Card } from "@prisma/client";
import { CopyCard } from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;
