"use client";

import ActivityItem from "@/components/activity/activity-item";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import React from "react";
interface AuditProps {
  data: AuditLog[];
}

const Activity: React.FC<AuditProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-start gap-x-3 w-full">
        <ActivityIcon className="mt-1 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700">Activity</p>
          <ol className="mt-2 space-y-4">
            {data.map((item) => (
              <ActivityItem data={item} key={item.id} />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Activity;
