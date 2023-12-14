import { AuditLog } from "@prisma/client";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { generateMessage } from "@/lib/generate-message";
import { format } from "date-fns";
interface ActivityItemProps {
  data: AuditLog;
}
const ActivityItem: React.FC<ActivityItemProps> = ({ data }) => {
  return (
    <>
      <li className="flex items-center gap-x-2">
        <Avatar className="h-8 w-8 ">
          <AvatarImage className="object-cover" src={data.userImage} alt="" />
        </Avatar>
        <div className="flex flex-col space-y-0.5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold lowercase text-neutral-600">
              {data.userName}
            </span>{" "}
            {generateMessage(data)}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
      </li>
    </>
  );
};

export default ActivityItem;
