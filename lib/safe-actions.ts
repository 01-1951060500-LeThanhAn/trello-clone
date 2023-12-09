import { z } from "zod";

export type FiledErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldError?: FiledErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResults = schema.safeParse(data);
    if (!validationResults.success) {
      return {
        fieldError: validationResults.error.flatten()
          .fieldErrors as FiledErrors<TInput>,
      };
    }

    return handler(validationResults.data);
  };
};
