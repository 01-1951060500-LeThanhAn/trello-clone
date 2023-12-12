import { z } from "zod";

import { DeleteFavourite } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { Likes } from "@prisma/client";

export type InputType = z.infer<typeof DeleteFavourite>;
export type ReturnType = ActionState<InputType, Likes>;
