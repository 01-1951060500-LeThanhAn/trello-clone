"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Organizations } from "@/interface";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

interface OrganItem {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organizations;
  onExpand: (id: string) => void;
}

const OrganizationItem: React.FC<OrganItem> = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Credits",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <>
      <AccordionItem value={organization.id} className="border-none mt-6">
        <AccordionTrigger
          onClick={() => onExpand(organization.id)}
          className={`flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline ${
            isActive && !isExpanded && `bg-sky-100 text-sky-700`
          }`}
        >
          <div className="flex items-center gap-x-2">
            <div className="w-7 h-7 relative">
              <Image
                src={organization.imageUrl}
                alt=""
                fill
                className="rounded-sm"
              />
            </div>
            <span className="text-base ml-3 font-medium">
              {organization.name}
            </span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pt-1 text-neutral-700">
          {routes.map((route) => (
            <Button
              key={route.href}
              size="sm"
              onClick={() => onClick(route.href)}
              variant="ghost"
              className={`w-full font-normal justify-start pl-10 mb-1
               ${pathname === route.href && `bg-sky-500/10 text-sky-700`}`}
            >
              {route.icon}
              {route.label}
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default OrganizationItem;
