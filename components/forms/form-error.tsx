import { XCircleIcon } from "lucide-react";
import React from "react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors: React.FC<FormErrorsProps> = ({ id, errors }) => {
  if (!errors) return null;
  return (
    <>
      <div className="mt-2 text-xs text-rose-500" id={id} aria-live="polite">
        {errors?.[id]?.map((error) => (
          <div
            key={error}
            className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
          >
            <XCircleIcon className="h-4 w-4 mr-2" />
            {error}
          </div>
        ))}
      </div>
    </>
  );
};

export default FormErrors;
