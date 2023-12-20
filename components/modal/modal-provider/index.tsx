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
import Skeleton from "react-loading-skeleton";
import ListLabel from "@/components/label/list-label";
import ListAttachFile from "@/components/attachfile/list-file";

const CardModal = () => {
  const [show, setShow] = useState<string>("");
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
        <DialogContent className="max-h-[80vh] min-w-[50%] overflow-y-auto">
          {!cardData ? (
            <div className="w-1/3 rounded-lg">
              {" "}
              <Skeleton className="h-12" />
            </div>
          ) : (
            <Header data={cardData as CardLists} />
          )}

          <div className="w-full">
            <ListLabel cardId={cardData?.id as string} />
          </div>

          <div>
            <ListAttachFile
              cardId={cardData?.id as string}
              show={show}
              setShow={setShow}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 mg:gap-4">
            <div className="col-span-3">
              <div className="w-full space-y-6">
                {!cardData ? (
                  <Skeleton className="w-full h-20" />
                ) : (
                  <Description data={cardData}></Description>
                )}
                {!auditLogData ? (
                  <>
                    <div className="flex">
                      <div className="w-12">
                        <Skeleton className=" h-12 rounded-full" />
                      </div>
                      <div className="w-full  ml-3">
                        <Skeleton className=" h-12 " />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="">
                    <Activity data={auditLogData as AuditLog[]}></Activity>
                  </div>
                )}
              </div>
            </div>
            {!cardData ? (
              <div className="grid grid-cols-2 mt-3 md:mt-0 md:flex md:flex-col gap-x-3 gap-y-2">
                <div className="w-full md:ml-3 ml-0">
                  <Skeleton className=" h-12 rounded-full" />
                </div>
                <div className="w-full  md:ml-3 ml-0">
                  <Skeleton className=" h-12 " />
                </div>
                <div className="w-full md:ml-3 ml-0">
                  <Skeleton className=" h-12 " />
                </div>
                <div className="w-full md:ml-3 ml-0">
                  <Skeleton className=" h-12 " />
                </div>
              </div>
            ) : (
              <Actions
                show={show}
                setShow={setShow}
                data={cardData as CardLists}
              />
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
