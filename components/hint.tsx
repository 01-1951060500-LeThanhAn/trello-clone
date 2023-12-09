import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HintProps {
  children?: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

const Hint: React.FC<HintProps> = ({
  children,
  description,
  side,
  sideOffset,
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent
            className="text-xs max-w-[220px] break-words"
            sideOffset={sideOffset}
            side={side}
          >
            {description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default Hint;
