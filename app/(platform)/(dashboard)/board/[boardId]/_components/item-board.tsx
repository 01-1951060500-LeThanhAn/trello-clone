"use client";
import { LabelList, ListCards } from "@/types";
import React, { ElementRef, useRef } from "react";
import ListHeader from "./header-board";
import useFunc from "@/hooks/useFunc";
import { CardForm } from "./card-form";
import CardItem from "./item-card";
import { Draggable, Droppable } from "@hello-pangea/dnd";
interface ItemBoardProps {
  data: ListCards;
  index: number;
}

const ListItem: React.FC<ItemBoardProps> = ({ data, index }) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const { isEditing, disableEditing, enableTextAreaEditing } = useFunc();

  return (
    <>
      <Draggable draggableId={data.id} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="shrink-0 h-full w-auto select-none"
          >
            <div
              {...provided.dragHandleProps}
              className="w-full rounded-md bg-[#f1f2f4] shadow-md px-2 py-2"
            >
              <ListHeader onAddCard={enableTextAreaEditing} data={data} />
              <Droppable droppableId={data.id} type="card">
                {(provided) => (
                  <ol
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`mx-1 px-1 py-0.5 flex  gap-y-2 flex-col ${
                      data.cards?.length > 0 ? "mt-2" : "mt-0"
                    }`}
                  >
                    {data.cards.map((card, index: number) => (
                      <CardItem
                        index={index}
                        card={card as LabelList}
                        key={card?.id}
                      />
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>

              <CardForm
                disableEditing={disableEditing}
                enableTextAreaEditing={enableTextAreaEditing}
                listId={data.id}
                ref={textAreaRef}
                isEditing={isEditing}
              />
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default ListItem;
