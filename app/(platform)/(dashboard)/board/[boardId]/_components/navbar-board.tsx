"use client";
import { Board } from "@prisma/client";
import React, { useEffect } from "react";
import BoardTitleForm from "./title-board";
import OptionsBoard from "./options-board";
import { addBoardHistory } from "@/constant/history";
import { notFound } from "next/navigation";
import { ListFilter, StarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "@/components/search-input/search-input";
interface BoardNavProps {
  board: Board;
  orgId: string;
}

const BoardNavbar: React.FC<BoardNavProps> = ({ board, orgId }) => {
  useEffect(() => {
    if (board.id && board.orgId === orgId) {
      addBoardHistory({
        id: board.id,
        title: board.title,
        imageThumbUrl: board?.imageThumbUrl ? board?.imageFullUrl : "",
        createdAt: Date.now(),
      });
    } else {
      notFound();
    }
  }, [board.id, board.orgId, orgId]);
  return (
    <>
      <div className="w-full h-14 gap-x-4 px-6 text-white z-[40] bg-black/50 fixed top-14 flex items-center">
        <BoardTitleForm data={board} />
        <div className="flex items-center">
          <StarIcon
            role="button"
            className=" mr-4 w-5 h-5 hover:bg-neutral-800 transition"
          />
          <User
            role="button"
            className="w-5 h-5 hover:bg-neutral-800 transition"
          />
        </div>
        <div className="ml-auto flex items-center">
          <Button variant="outline" className="text-neutral-600 mr-3">
            Share
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary" className="flex items-center">
                <p className="mr-3">Filter</p>
                <ListFilter />
              </Button>
            </PopoverTrigger>

            <PopoverContent side="bottom" className="mr-4 h-auto" align="start">
              <SearchInput />
            </PopoverContent>
          </Popover>
          <OptionsBoard id={board.id} />
        </div>
      </div>
    </>
  );
};

export default BoardNavbar;
