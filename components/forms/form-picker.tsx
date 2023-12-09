"use client";
import { defaultImages } from "@/constant/images";
import { unsplash } from "@/lib/unplash";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-error";
interface FormPickerProps {
  id?: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker: React.FC<FormPickerProps> = ({ id, errors }) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectImg] = useState<string | null>(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const results = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (results && results.response) {
          const newImages = results.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("Failed to get image from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSelectImage = (idImage: string | null) => {
    if (pending) return;
    setSelectImg(idImage);
  };

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
        <div className="grid grid-cols-3 gap-2 mb-2">
          {images.map((image) => (
            <div
              key={image.id}
              className={`cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted ${
                pending && "opacity-50 hover:opacity-50 cursor-auto"
              }`}
              onClick={() => {
                if (pending) return;
                setSelectImg(image.id);
              }}
            >
              <input
                type="radio"
                id={id}
                name={id}
                checked={selectedImg === image.id}
                className="hidden"
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image
                src={image.urls.thumb}
                alt="Unsplash image"
                className="object-cover rounded-sm"
                fill
              />
              {selectedImg === image.id && (
                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <Link
                href={""}
                target="_blank"
                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
              >
                {image.user.name}
              </Link>
            </div>
          ))}
        </div>
        <FormErrors id="image" errors={errors} />
      </div>
    </>
  );
};

export default FormPicker;
