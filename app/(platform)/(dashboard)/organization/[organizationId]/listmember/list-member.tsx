"use client";

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";

const ListMembers = () => {
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  console.log(userMemberships.data);

  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <>
      {/* <ul>
        {userMemberships.data?.map((mem) => (
          <li key={mem.id}>
            <span>{mem.organization.name}</span>
            <button
              onClick={() => setActive({ organization: mem.organization.id })}
            >
              Select
            </button>
          </li>
        ))}
      </ul>

      <button
        disabled={!userMemberships.hasNextPage}
        onClick={() => userMemberships.fetchNext()}
      >
        Load more
      </button> */}
    </>
  );
};

export default ListMembers;
