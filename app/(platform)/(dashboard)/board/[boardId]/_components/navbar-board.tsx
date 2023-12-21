"use client";
import { Board } from "@prisma/client";
import React, { useEffect, useState } from "react";
import BoardTitleForm from "./title-board";
import OptionsBoard from "./options-board";
import { addBoardHistory } from "@/constant/history";
import { notFound } from "next/navigation";
import { ListFilter, Plus, StarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "@/components/search-input/search-input";
import { useUser } from "@clerk/nextjs";
import { useAction } from "@/hooks/use-actions";
import { addFavouriteBoard } from "@/actions/favourite/add-favourite/main";
import { toast } from "sonner";
import { NextPage } from "next";
interface BoardNavProps {
  board: Board;
  orgId: string;
}

const BoardNavbar: NextPage<BoardNavProps> = ({ board, orgId }) => {
  const { user } = useUser();
  if (!user) return null;
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`favorite_${board.id}`) === "true"
  );
  const { execute: exeAddFavourite } = useAction(addFavouriteBoard, {
    onSuccess: (data) => {
      toast.success(`Added board ${data.title} success to list favourite`);
      setIsFavorite(true);
      localStorage.setItem(`favorite_${board.id}`, "true");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onAddBoardFavourite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      localStorage.removeItem(`favorite_${board.id}`);
    } else {
      exeAddFavourite({
        title: board.title,
        boardId: board.id,

        imageThumbUrl: board.imageThumbUrl ? board.imageThumbUrl : "",
      });
    }
  };

  useEffect(() => {
    console.log("Current favorite status:", isFavorite);
  }, [isFavorite]);

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
        <div className="hidden md:block">
          <BoardTitleForm data={board} />
        </div>
        <div className="flex items-center">
          <div className="px-3 md:px-0" onClick={onAddBoardFavourite}>
            <StarIcon
              role="button"
              className={`mr-4 w-5 h-5 ${
                isFavorite ? "text-yellow-500" : ""
              } hover:bg-neutral-800 transition`}
            />
          </div>
          <User
            role="button"
            className="w-5 h-5 hover:bg-neutral-800 transition"
          />
        </div>
        <div className="ml-auto flex items-center">
          <Button variant="outline" className="text-neutral-600 mr-3">
            <Plus className="w-4 h-4 mr-2" />
            Invite
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
          <OptionsBoard data={board} id={board.id} />
        </div>
      </div>
    </>
  );
};

export default BoardNavbar;
