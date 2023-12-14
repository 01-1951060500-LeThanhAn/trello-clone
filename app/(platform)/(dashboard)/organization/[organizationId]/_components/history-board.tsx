"use client";
import { Button } from "@/components/ui/button";
import { getBoardHistory } from "@/constant/history";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HistoryBoard = () => {
  const [boardHistorys, setBoardHistorys] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const history = getBoardHistory();
      setBoardHistorys(history);
    }
  }, []);

  const handleDeleteBoard = () => {
    if (history.length === 0) return;
    if (window.confirm("You sure want to delete all board ?")) {
      localStorage.clear();
      setBoardHistorys([]);
    }
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {boardHistorys.map((board) => (
          <>
            <Link
              className="group z-10 relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-md h-full w-full p-2 overflow-hidden"
              style={{
                backgroundImage: `url(${board.imageThumbUrl})`,
              }}
              key={board.id}
              href={`/board/${board.id}`}
            >
              <div className="absolute text-white p-2 inset-0 bg-black/30 group-hover:bg-black/40 transition">
                {board.title}
              </div>
            </Link>
          </>
        ))}

        <Button
          onClick={handleDeleteBoard}
          className="rounded-sm py-3 relative h-full w-auto bg-muted transition flex items-center justify-center hover:opacity-75 break-all"
          variant="ghost"
        >
          Delete Board Watched
        </Button>
      </div>
    </>
  );
};

export default HistoryBoard;
