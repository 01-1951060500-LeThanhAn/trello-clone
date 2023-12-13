"use client";
import { copyCards } from "@/actions/card-copy/main";
import { deleteCards } from "@/actions/delete-card/main";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import { useModelCard } from "@/hooks/useModelCard";
import { CardLists } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
interface ActionProps {
  data: CardLists;
}

const Actions: React.FC<ActionProps> = ({ data }) => {
  const { user } = useUser();
  console.log(data);
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
      <div className="mt-2 space-y-2 ml-0 md:ml-2">
        <p className="text-base font-semibold">Actions</p>

        <Button
          disabled={isLoadingCopy}
          onClick={onCopy}
          className="md:mt-2"
          variant={"primary"}
        >
          <Copy className="w-4 h-4" size="sm" />
        </Button>
        {data.userId === user?.id && (
          <Button
            disabled={isLoadingDelete}
            onClick={onDelete}
            className="md:mt-2 ml-2"
            variant={"destructive"}
          >
            <Trash className="w-4 h-4" size="sm" />
          </Button>
        )}
      </div>
    </>
  );
};

export default Actions;
