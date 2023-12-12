import { z } from "zod";

import { AddFavourite } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { Likes } from "@prisma/client";

export type InputType = z.infer<typeof AddFavourite>;
export type ReturnType = ActionState<InputType, Likes>;
