"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("query") : ""
  );
  const router = useRouter();

  const onSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <>
      <form onSubmit={onSearch} className="w-full">
        <input
          value={searchQuery || ""}
          id="title"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search title card and list..."
          type="text"
          required
          className="w-full border border-1 rounded-md px-2 py-1 text-sm outline-none h-auto"
        />
      </form>
    </>
  );
};

export default SearchInput;
