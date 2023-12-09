import FormPopover from "@/components/forms/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect(`/select-org`);
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="space-y-4">
        <div className="flex text-neutral-700 items-center font-semibold text-lg">
          <User2 className="h-6 w-6 mr-2" />
          Your boards
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {boards ? (
            boards.map((board) => (
              <Link
                className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-md h-full w-full p-2 overflow-hidden"
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
            ))
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              <Skeleton className=" aspect-video h-full w-full" />
            </div>
          )}
          <FormPopover sideOffset={10} side="right">
            <div
              role="button"
              className="rounded-sm py-3 relative h-full w-full bg-muted transition flex flex-col gap-y-1 items-center justify-center hover:opacity-75"
            >
              <p className=" font-semibold ">Create new board</p>
              <span>{`10 remaining`}</span>
              <Hint
                sideOffset={40}
                description="Free Workspaces can have up to 5 open boards"
              >
                <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
              </Hint>
            </div>
          </FormPopover>
        </div>
      </div>
    </>
  );
};

export default BoardList;
