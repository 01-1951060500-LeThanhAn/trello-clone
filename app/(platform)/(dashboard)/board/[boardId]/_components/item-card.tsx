"use client";
import { useModelCard } from "@/hooks/useModelCard";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import React from "react";
interface CardItemProps {
  index: number;
  card: Card;
}
const CardItem: React.FC<CardItemProps> = ({ index, card }) => {
  const cardModal = useModelCard();
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
              card.title
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default CardItem;
