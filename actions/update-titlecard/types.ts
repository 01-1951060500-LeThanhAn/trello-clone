import { z } from "zod";
import { Card } from "@prisma/client";

import { UpdateCardTitle } from "./schema";
import { ActionState } from "@/lib/safe-actions";

export type InputType = z.infer<typeof UpdateCardTitle>;
export type ReturnType = ActionState<InputType, Card>;
