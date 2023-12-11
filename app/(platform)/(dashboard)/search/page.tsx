import { db } from "@/lib/db";
import { NextPage } from "next";
import React from "react";
import ResultsSearchPage from "./_components/results-search";
interface SearchProps {
  searchParams: {
    query: string;
  };
}

const SearchPage: NextPage<SearchProps> = async ({
  searchParams: { query },
}) => {
  const cards = await db.card.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      id: "desc",
    },
  });

  if (+cards.length === 0) {
    return (
      <>
        <div className="text-center text-black text-lg mt-20 ">
          No products find
        </div>
      </>
    );
  }

  return (
    <>
      <div className="">
        <ResultsSearchPage cards={cards} />
      </div>
    </>
  );
};

export default SearchPage;
