import { z } from "zod";
import { Card } from "@prisma/client";
import { CreateCardNotImage } from "./schema";
import { ActionState } from "@/lib/safe-actions";

export type InputType = z.infer<typeof CreateCardNotImage>;
export type ReturnType = ActionState<InputType, Card>;
