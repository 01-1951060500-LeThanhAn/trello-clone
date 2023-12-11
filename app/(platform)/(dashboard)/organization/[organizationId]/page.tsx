import React, { Suspense } from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";
import HistoryBoard from "./_components/history-board";
import { Clock } from "lucide-react";

const OrganizationPage = async () => {
  return (
    <>
      <div className="w-full mb-20">
        <Info />
        <Separator className="mt-4" />
        <div className="px-2 md:px-4 mt-3">
          <Suspense>
            <BoardList />
          </Suspense>
        </div>

        <div className="px-2 md:px-4 mt-12 mb-6 font-semibold text-lg">
          <div className="flex items-center">
            <Clock className="mr-3" />
            History Watched
          </div>
        </div>
        <div className="px-2 md:px-4 mt-3">
          <HistoryBoard />
        </div>
      </div>
    </>
  );
};

export default OrganizationPage;
