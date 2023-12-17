import { z } from "zod";

import { CreateAttachment } from "./schema";
import { ActionState } from "@/lib/safe-actions";
import { Attachment } from "@prisma/client";

export type InputType = z.infer<typeof CreateAttachment>;
export type ReturnType = ActionState<InputType, Attachment>;
