"use client";
import { ColorProps } from "@/interface";
import { Check, Loader2 } from "lucide-react";
import { NextPage } from "next";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-error";

interface FormPickerColorProps {
  id?: string;
  errors?: Record<string, string[] | undefined>;
}

const listColor: ColorProps[] = [
  {
    id: 1,
    color: "#164B35",
  },
  {
    id: 2,
    color: "#55b6ef",
  },
  {
    id: 3,
    color: "#1a338f",
  },
  {
    id: 4,
    color: "#d74f15",
  },
  {
    id: 5,
    color: "#9f0707",
  },
  {
    id: 6,
    color: "#292d2c",
  },
  {
    id: 7,
    color: "#19df2a",
  },
  {
    id: 8,
    color: "#deec13",
  },
  {
    id: 9,
    color: "#ec20e2",
  },
];

const FormPickColor: NextPage<FormPickerColorProps> = ({ id, errors }) => {
  const { pending } = useFormStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectImg] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="pp-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-3 gap-2 mb-2 mt-3">
          {listColor.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: item.color,
              }}
              className={`cursor-pointer  relative aspect-video group hover:opacity-75 transition  ${
                pending && "opacity-50 hover:opacity-50 cursor-auto"
              }`}
              onClick={() => {
                if (pending) return;
                setSelectImg(item.id);
              }}
            >
              <input
                type="radio"
                id={id}
                name={id}
                checked={selectedImg === item.id}
                className="hidden"
                disabled={pending}
                value={item.color}
              />
              {selectedImg === item.id && (
                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        <FormErrors id="color" errors={errors} />
      </div>
    </>
  );
};

export default FormPickColor;
