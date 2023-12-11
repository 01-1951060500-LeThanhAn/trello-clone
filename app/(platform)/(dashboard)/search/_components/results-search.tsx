"use client";
import { defaultImages } from "@/constant/images";
import { unsplashBg } from "@/lib/unplash";
import { Card } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useModelCard } from "@/hooks/useModelCard";

interface CardSearchProps {
  cards: Card[];
}

const ResultsSearchPage: NextPage<CardSearchProps> = ({ cards }) => {
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const cardModal = useModelCard();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const results = await unsplashBg.photos.getRandom({
          collectionIds: ["320012"],
          count: 9,
        });

        console.log(results.response);
        if (results && results.response) {
          const newImages = results.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("Failed to get image from Unsplash");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [images, isLoading]);

  if (isLoading) {
    return (
      <div className="pp-6 flex items-center justify-center">
        <Loader2 className="h-full w-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[0].urls.full})`,
        }}
      >
        <div className="grid overflow-x-hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-x-3 h-auto px-4">
          {cards.map((card) => (
            <div
              key={card.id}
              role="button"
              onClick={() => cardModal.onOpen(card.id)}
              className="truncate mt-20  py-2 px-3 text-sm rounded-md shadow-md  border-transparent hover:border-black bg-white"
            >
              {card.title.startsWith("https://") ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="underline whitespace-nowrap overflow-hidden text-ellipsis break-words text-sky-700"
                  href={card.title}
                >
                  {card.title}
                </a>
              ) : (
                card.title
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultsSearchPage;
