"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Organizations, SidebarProps } from "@/interface";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import OrganizationItem from "./OrganizationItem";

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-10" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-base flex items-center mb-1">
        <span className="pr-3">Workspaces</span>
        <Button asChild type="button" className="ml-auto" size="icon">
          <Link href={`/select-org`}>
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <OrganizationItem
            key={organization.id}
            isActive={activeOrganization?.id === organization?.id}
            isExpanded={expanded[organization.id]}
            onExpand={onExpand}
            organization={organization as Organizations}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
