"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModelCard } from "@/hooks/useModelCard";
import { fetcher } from "@/lib/fetcher";
import { CardLists } from "@/types";
import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import Header from "./header";
import Description from "./description";
import Actions from "./actions";
import { AuditLog } from "@prisma/client";
import Activity from "./activity";
import FormComment from "./comment";
import CommentList from "@/components/comments/list-comment";

const CardModal = () => {
  const { isOpen, onClose, id } = useModelCard();
  const [comments, setComments] = useState<any[]>([]);
  const { data: cardData } = useQuery<CardLists>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogData } = useQuery<AuditLog[]>({
    queryKey: ["auditlog", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <>
      <Dialog onOpenChange={onClose} open={isOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          {!cardData ? (
            <div>Loading...</div>
          ) : (
            <Header data={cardData as CardLists} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 mg:gap-4">
            <div className="col-span-3">
              <div className="w-full space-y-6">
                {!cardData ? (
                  <p>Loading...</p>
                ) : (
                  <Description data={cardData}></Description>
                )}
                {!auditLogData ? (
                  <p>Loading...</p>
                ) : (
                  <Activity data={auditLogData as AuditLog[]}></Activity>
                )}
              </div>
            </div>
            {!cardData ? (
              <p>Loading...</p>
            ) : (
              <Actions data={cardData as CardLists} />
            )}
          </div>
          <p className="font-semibold">Comments</p>
          <FormComment
            comments={comments}
            setComments={setComments}
            cardId={cardData?.id as string}
          />

          <CommentList
            comments={comments}
            setComments={setComments}
            cardId={cardData?.id as string | undefined}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardModal;
