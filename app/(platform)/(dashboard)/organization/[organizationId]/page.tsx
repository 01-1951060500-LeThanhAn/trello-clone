import React, { Suspense } from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";
import ListMembers from "./listmember/list-member";

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

        <ListMembers />
      </div>
    </>
  );
};

export default OrganizationPage;
