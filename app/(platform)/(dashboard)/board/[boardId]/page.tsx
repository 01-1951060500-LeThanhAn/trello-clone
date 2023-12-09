import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ListBoards from "./_components/list-board";

interface BoardPageIdProps {
  params: {
    boardId: string;
  };
}
const BoardPage: React.FC<BoardPageIdProps> = async ({ params }) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect(`/select-org`);
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "desc",
        },
      },
    },
    orderBy: {
      order: "desc",
    },
  });

  return (
    <>
      <div className="mt-14 p-2  h-full overflow-x-auto">
        <ListBoards boardId={params?.boardId} data={lists} />
      </div>
    </>
  );
};

export default BoardPage;
