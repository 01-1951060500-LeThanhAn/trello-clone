"use client";
import { useModelCard } from "@/hooks/useModelCard";
import { Draggable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { CommentList, LabelList } from "@/types";
import Image from "next/image";
import getAllLabel from "@/components/label/card-label";
import { Skeleton } from "@/components/ui/skeleton";
import formatTime from "@/constant/formatTime";
import { Activity, Clock11, MessageSquareIcon } from "lucide-react";
import getCountComment from "@/components/comments/get-count-comment";
interface CardItemProps {
  index: number;
  card: LabelList;
}

const CardItem: React.FC<CardItemProps> = ({ index, card }) => {
  const cardModal = useModelCard();
  const [cards, setCards] = useState<LabelList[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchAllLabel = async () => {
      const res = await getAllLabel(card.id);
      setCards(res);
    };
    setLoading(false);
    fetchAllLabel();
  }, [card.id]);

  useEffect(() => {
    const fetchCountComment = async () => {
      const res = await getCountComment(card.id);
      const totalCount = res.reduce((total, item) => {
        return total + (item?.comments?.length || 0);
      }, 0);
      setCount(totalCount);
    };
    fetchCountComment();
  }, [card.id]);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => cardModal.onOpen(card.id)}
            className="truncate  py-2 px-3 text-sm rounded-md shadow-md  border-transparent hover:border-black bg-white"
          >
            {card &&
              cards.map((card) => (
                <div key={card.id}>
                  {!loading ? (
                    card.labels &&
                    card.labels.map((label) => (
                      <p
                        key={label.id}
                        className="z-50 mb-1 mx-2 text-white inline-block rounded-md  text-xs font-semibold px-2 py-0 -ml-1"
                        style={{
                          backgroundColor: label.color,
                          width: "auto",
                        }}
                      >
                        {label.name}
                      </p>
                    ))
                  ) : (
                    <>
                      <div className="flex">
                        <Skeleton className="w-12 h-4 bg-neutral-300" />
                        <Skeleton className="w-12 h-4 mx-2 bg-neutral-300" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            <div>
              {card.title.startsWith("https://") ? (
                <a
                  target="_blank"
                  aria-description="Title"
                  rel="noreferrer"
                  className="underline whitespace-nowrap overflow-hidden text-ellipsis break-words text-sky-700"
                  href={card.title}
                >
                  {card.title}
                </a>
              ) : (
                <p className="">{card.title}</p>
              )}
            </div>

            <div className="">
              {card?.image ? (
                <Image
                  className="w-full mt-2 h-36 object-contain"
                  src={card?.image}
                  width={40}
                  height={40}
                  alt=""
                  unoptimized
                />
              ) : null}
            </div>

            <div className="flex items-center justify-between">
              <div className=" text-neutral-400 text-xs flex items-center mt-2">
                <Clock11 className="w-4 h-4" />
                <p className="ml-1">{formatTime(card.createdAt)}</p>
              </div>

              <div className="flex items-center mt-3">
                <div className="flex items-center text-neutral-400 mr-3">
                  <Activity className="w-4 h-4" />
                  <p>{card.order}</p>
                </div>
                <div className="flex items-center text-neutral-400">
                  <MessageSquareIcon className="w-4 h-4" />
                  <p className="ml-1">{count}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default CardItem;
