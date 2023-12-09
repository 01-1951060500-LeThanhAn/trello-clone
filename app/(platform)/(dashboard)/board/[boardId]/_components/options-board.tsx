"use client";

import { deleteBoard } from "@/actions/delete-board/main";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-actions";
import { MoreHorizontal, X } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
interface OptionsBoardProp {
  id: string;
}

const OptionsBoard: React.FC<OptionsBoardProp> = ({ id }) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="h-auto w-auto p-2" variant="ghost">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="px-0 py-3" side="bottom" align="start">
          <div className="text-sm font-medium text-center text-neutral-600">
            Board Actions
          </div>
          <PopoverClose asChild>
            <Button
              variant="ghost"
              className="h-auto w-auto p-2 absolute top-0 right-2"
            >
              <X className="h-6 w-6" />
            </Button>
          </PopoverClose>
          <Button
            variant="ghost"
            disabled={isLoading}
            onClick={onDelete}
            className="rounded-none mt-2 w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this board
          </Button>
          <Accordion type="multiple" className="space-y-2 px-3">
            <AccordionItem value={id} className="outline-none">
              {" "}
              <AccordionTrigger
                className={`flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline `}
              >
                Members
              </AccordionTrigger>
              <AccordionContent className="mt-3">Thanh An</AccordionContent>
            </AccordionItem>
          </Accordion>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default OptionsBoard;
