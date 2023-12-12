"use client";
import OrganizationItem from "@/app/(platform)/(dashboard)/_components/OrganizationItem";
import { Organizations, SidebarProps } from "@/interface";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { Accordion } from "../ui/accordion";

const ListWorkSpace = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

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

  return (
    <>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships?.data &&
          userMemberships.data.map(({ organization }) => (
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

export default ListWorkSpace;
