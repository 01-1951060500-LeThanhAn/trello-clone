"use client";
import React, { useEffect, useState } from "react";
import getAllLabel from "./get-label";
import { Label } from "@prisma/client";
import { Loader2 } from "lucide-react";

const ListLabel = ({ cardId }: { cardId: string }) => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(false);
  const updateLabels = async () => {
    setLoading(true);
    try {
      const res = await getAllLabel(cardId);
      setLabels(res);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching labels:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (cardId) {
      updateLabels();
    }
  }, [cardId]);
  return (
    <>
      <div className="flex items-center gap-x-2 flex-1 flex-wrap">
        {loading ? (
          <Loader2 className="w-8 h-8  mx-auto animate-spin" />
        ) : (
          labels.map((item) => (
            <div
              className=""
              style={{ backgroundColor: item.color }}
              key={item.id}
            >
              <p className="text-white px-2 py-1 text-ellipsis whitespace-nowrap">
                {item.name}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListLabel;