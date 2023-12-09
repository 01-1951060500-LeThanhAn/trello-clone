import { UpdateCardOrder } from "./schema";
import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/safe-actions";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;
