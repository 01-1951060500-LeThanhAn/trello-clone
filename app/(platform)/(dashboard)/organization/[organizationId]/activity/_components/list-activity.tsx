import ActivityItem from "@/components/activity/activity-item";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const ListActivity = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect(`/select-org`);
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
  });
  return (
    <>
      <div className="space-y-4 mt-3">
        <p className="hidden last:block text-base text-center text-muted-foreground">
          No Activity found inside this organozation
        </p>

        {auditLogs.map((log) => (
          <ActivityItem key={log.id} data={log} />
        ))}
      </div>
    </>
  );
};

export default ListActivity;
