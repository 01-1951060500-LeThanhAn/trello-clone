import { UpdateCard } from "./schema";
import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/safe-actions";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, List[]>;
