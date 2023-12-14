import { z } from "zod";

import { CreateLabel } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { Label } from "@prisma/client";

export type InputType = z.infer<typeof CreateLabel>;
export type ReturnType = ActionState<InputType, Label>;
