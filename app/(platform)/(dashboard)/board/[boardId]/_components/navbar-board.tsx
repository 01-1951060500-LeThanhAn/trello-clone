"use client";
import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "./title-board";
import OptionsBoard from "./options-board";
interface BoardNavProps {
  board: Board;
}

const BoardNavbar: React.FC<BoardNavProps> = async ({ board }) => {
  return (
    <>
      <div className="w-full h-14 gap-x-4 px-6 text-white z-[40] bg-black/50 fixed top-14 flex items-center">
        <BoardTitleForm data={board} />
        <div className="ml-auto">
          <OptionsBoard id={board.id} />
        </div>
      </div>
    </>
  );
};

export default BoardNavbar;
