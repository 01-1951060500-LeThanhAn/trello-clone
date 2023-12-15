"use client";
import React, { useEffect, useRef, useState } from "react";
import getAllLabel from "./get-label";
import { Label } from "@prisma/client";
import { Loader2, Plus, XCircle } from "lucide-react";
import { useAction } from "@/hooks/use-actions";
import { deleteLabel } from "@/actions/label/delete-label/main";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import FormLabel from "../forms/form-label";

const ListLabel = ({ cardId }: { cardId: string }) => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(false);
  const closeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { user } = useUser();
  const { execute: exeDeleteLabel } = useAction(deleteLabel, {
    onSuccess: (data) => {
      toast.success(`Deleted label "${data?.name}" from card`);
    },
    onError: (err) => {
      toast.error("Delete failed label");
    },
  });
  const updateLabels = async () => {
    setLoading(true);
    try {
      const res = await getAllLabel(cardId);
      setLabels(res);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching labels:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (cardId) {
      updateLabels();
    }
  }, [cardId]);

  const onSubmit = async (id: string) => {
    try {
      await exeDeleteLabel({ id, cardId });

      updateLabels();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2 flex-1 flex-wrap">
        {loading ? (
          <Loader2 className="w-8 h-8  mx-auto animate-spin" />
        ) : (
          <>
            {labels && labels.length === 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default" className="mb-3 ">
                    Stick the sticker
                    <Plus className="w-4 h-4 ml-3" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <FormLabel cardId={cardId} />
                </PopoverContent>
              </Popover>
            ) : (
              labels.map((item, index) => (
                <>
                  <div
                    className="relative group"
                    style={{ backgroundColor: item.color }}
                    key={item.id}
                    ref={(el) => (closeRefs.current[index] = el)}
                  >
                    <p className="text-white px-2 py-1 text-ellipsis whitespace-nowrap">
                      {item.name}
                    </p>
                    {user?.id === item.userId && (
                      <div
                        role="button"
                        onClick={() => onSubmit(item.id)}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {" "}
                        <XCircle className="text-base w-4 h-4" />
                      </div>
                    )}
                  </div>
                </>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListLabel;
