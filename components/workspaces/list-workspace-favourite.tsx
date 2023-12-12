"use client";
import { deleteFavouriteBoard } from "@/actions/favourite/delete-favourite/main";
import { useAction } from "@/hooks/use-actions";
import { useUser } from "@clerk/nextjs";

import { Likes } from "@prisma/client";
import { XCircle } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface FavouriteBoardProps {
  item: Likes;
  favouriteBoard: Likes[];
}
const FavouriteBoard: NextPage<FavouriteBoardProps> = ({
  item,
  favouriteBoard,
}) => {
  const { user } = useUser();
  const [favouriteList, setFavouriteList] = useState<Likes[]>([]);
  const { execute: exeDeleteFavouriteBoard, isLoading: isLoadingDelete } =
    useAction(deleteFavouriteBoard, {
      onSuccess: async (data) => {
        toast.success(`Deleted "${data.title}" success from list favourite`);
        localStorage.removeItem(`favorite_${item.boardId}`);
        const updatedList = favouriteList.filter((data) => data.id !== item.id);
        setFavouriteList(updatedList);
      },
      onError: (err) => {
        toast.error(err);
      },
    });

  useEffect(() => {
    setFavouriteList(favouriteBoard);
  }, []);

  const onDeleteBoardFavourite = () => {
    exeDeleteFavouriteBoard({
      id: item.id,
      boardId: item.boardId,
    });
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Link href={`/board/${item.boardId}`}>
          <div className="flex items-center justify-between my-2 p-2 bg-transparent hover:bg-neutral-200">
            <Image
              src={item.imageThumbUrl ? item.imageThumbUrl : ""}
              alt={item.title}
              width={55}
              height={55}
            />

            <div className="ml-3">
              <p className="text-xs text-neutral-700">{item.title}</p>
              <p className="text-sm">
                <span className="font-semibold">{user?.fullName}</span>'s
                workspace
              </p>
            </div>
          </div>
        </Link>

        <Button
          disabled={isLoadingDelete}
          onClick={onDeleteBoardFavourite}
          role="button"
          className="ml-2"
          variant="ghost"
        >
          <XCircle className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
};

export default FavouriteBoard;
