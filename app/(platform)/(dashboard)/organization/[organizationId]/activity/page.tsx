import React, { Suspense } from "react";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import ListActivity from "./_components/list-activity";

const ActivityPage = () => {
  return (
    <>
      <div className="w-full">
        <Info />
        <Separator className="my-2" />
        <Suspense fallback={false}>
          <ListActivity />
        </Suspense>
      </div>
    </>
  );
};

export default ActivityPage;
