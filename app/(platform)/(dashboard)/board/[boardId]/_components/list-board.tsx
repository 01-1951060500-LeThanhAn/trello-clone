"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListCards } from "@/types";
import React, { useEffect, useState } from "react";
import FormList from "./form-list";
import ListItem from "./item-board";
import drag from "@/constant/drag";
import { useAction } from "@/hooks/use-actions";
import { updateOrder } from "@/actions/card/update-card/main";
import { toast } from "sonner";
import { updateOrderCard } from "@/actions/card/update-card-order/main";
import { Card } from "@prisma/client";
interface ListBoardProps {
  boardId: string;
  data: ListCards[];
}

const ListBoards: React.FC<ListBoardProps> = ({ boardId, data }) => {
  const [orderData, setOrderData] = useState(data);
  const { execute: executeUpdateOrder } = useAction(updateOrder, {
    onSuccess: () => {
      toast.success(`List dragged`);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const { execute: executeCard } = useAction(updateOrderCard, {
    onSuccess: () => {
      toast.success(`Card updated`);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  const onDragEnd = (results: any) => {
    const { destination, source, type } = results;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = drag(orderData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderData(items);

      executeUpdateOrder({ items, boardId } as any);
    }

    if (type === "card") {
      const newOrderData = [...orderData];

      const sourceList = newOrderData.find(
        (list) => list.id === source.droppableId
      );
      const desList = newOrderData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !desList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!desList.cards) {
        desList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const dragCards = drag(
          sourceList.cards,
          source.index,
          destination.index
        );

        dragCards.forEach((card: any, index) => {
          card.order = index;
        });

        sourceList.cards = dragCards;

        setOrderData(newOrderData);
        executeCard({ boardId: boardId, items: dragCards as Card[] });
      } else {
        //Remove card form the list source
        const [moveCard] = sourceList.cards.splice(source.index, 1);

        moveCard.listId = destination.droppableId;

        //Add card to the desination list

        desList.cards.splice(destination.index, 0, moveCard);

        sourceList.cards.forEach(
          (card: any, index: number) => (card.order = index)
        );

        //Update the order

        desList.cards.forEach((card: any, index: number) => {
          card.order = index;
        });

        setOrderData(newOrderData);
        executeCard({ boardId: boardId, items: desList.cards });
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="horizontal">
          {(provided) => (
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex scrollbar-hide gap-x-5 overflow-x-auto scroll-smooth whitespace-nowrap"
              // className="grid overflow-x-hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-x-3 h-full "
            >
              {orderData.map((data, index) => (
                <ListItem key={data.id} index={index} data={data} />
              ))}
              {provided.placeholder}
              <FormList />
              <div className="flex-shrink-0 w-1"></div>
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ListBoards;
