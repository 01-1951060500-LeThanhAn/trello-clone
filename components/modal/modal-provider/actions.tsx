"use client";
import { copyCards } from "@/actions/card-copy/main";
import { deleteCards } from "@/actions/delete-card/main";
import FormAttachMent from "@/components/forms/form-attachment";
import FormLabel from "@/components/forms/form-label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-actions";
import { useModelCard } from "@/hooks/useModelCard";
import { CardLists } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Copy, EyeIcon, Paperclip, Trash, User2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
interface ActionProps {
  data: CardLists;
}

const Actions: React.FC<ActionProps> = ({ data }) => {
  const { user } = useUser();

  const params = useParams();
  const { onClose } = useModelCard();
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCards,
    {
      onSuccess: (data) => {
        toast.success(`Copied ${data.title} success `);
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCards,
    {
      onSuccess: (data) => {
        toast.success(`Delete ${data.title} success `);
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <>
      <div className="mt-2 md:mt-0 space-y-2 ml-0 md:ml-2">
        <p className="text-base font-semibold">Actions</p>

        <div className=" grid grid-cols-2  md:flex md:flex-col gap-x-3 gap-y-2">
          <Button
            disabled={isLoadingCopy}
            onClick={onCopy}
            className="md:mt-2"
            variant={"primary"}
          >
            <Copy className="w-4 h-4" size="sm" />
            <p className="ml-2">Copy</p>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="md:mt-2" variant={"primary"}>
                <EyeIcon className="w-4 h-4" size="sm" />
                <p className="ml-2">Stick Label</p>
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <FormLabel cardId={data.id} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="md:mt-2" variant={"primary"}>
                <Paperclip className="w-4 h-4" size="sm" />
                <p className="ml-2">Attach File</p>
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <FormAttachMent
                cardId={data.id}
                userId={user?.id as string}
                username={user?.fullName as string}
              />
            </PopoverContent>
          </Popover>

          {data.userId === user?.id && (
            <Button
              disabled={isLoadingDelete}
              onClick={onDelete}
              className="md:mt-2 "
              variant={"destructive"}
            >
              <Trash className="w-4 h-4" size="sm" />
              <p className="ml-2">Delete</p>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Actions;
