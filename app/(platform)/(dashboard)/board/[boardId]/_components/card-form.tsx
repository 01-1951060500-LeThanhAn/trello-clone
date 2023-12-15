"use client";
import { Button } from "@/components/ui/button";
import { Image as Img, Plus, X, XCircle } from "lucide-react";
import React, { KeyboardEventHandler, forwardRef, useState } from "react";
import { FormTextArea } from "./textarea-form";
import { FormSubmits } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-actions";
import { createCards } from "@/actions/card/create-card/main";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import useFunc from "@/hooks/useFunc";
import Image from "next/image";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import axios from "axios";
import { createCardsNotImage } from "@/actions/card/create-card-notimage/main";
interface CardFormProps {
  disableEditing: () => void;
  enableTextAreaEditing: () => void;
  listId: string;
  isEditing: boolean;
}
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, isEditing, listId, enableTextAreaEditing }, ref) => {
    const params = useParams();
    const { formRef, onKeydown } = useFunc();
    const [file, setFile] = useState<File | null>(null);

    const { execute: exeCreateCard, fieldErrors } = useAction(createCards, {
      onSuccess: (data) => {
        toast.success(`Created card ${data.title} in this board`);
        disableEditing();
        setFile(null);
      },
      onError: () => {
        toast.error("Create card failed");
        setFile(null);
      },
    });

    const { execute: exeCreateCardNotImage, fieldErrors: errorNotImage } =
      useAction(createCardsNotImage, {
        onSuccess: (data) => {
          toast.success(`Created card ${data.title} in this board`);
          disableEditing();
          setFile(null);
        },
        onError: () => {
          toast.error("Create card failed");
          setFile(null);
        },
      });

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? e.target.files[0] : null;
      setFile(files);
    };
    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeydown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = async (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      let results:
        | FormData
        | any
        | { title: string; listId: string; boardId: string; image?: string } = {
        title,
        listId,
        boardId,
      };

      const imageData = new FormData() as any;
      imageData.append("file", file);
      imageData.append("upload_preset", "videos");
      imageData.append("cloud_name", "dkw090gsn");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dkw090gsn/image/upload`,
        imageData
      );
      exeCreateCard({ ...results, image: res.data?.url });
    };

    const onSubmitNotImage = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      exeCreateCardNotImage({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <>
          <form
            action={file ? onSubmit : onSubmitNotImage}
            className="m-1 py-1 space-y-4"
          >
            <FormTextArea
              errors={fieldErrors}
              id="title"
              onKeyDown={onTextareaKeyDown}
              ref={ref}
              placeholder="Enter a title for this card..."
            />
            <input hidden id="listId" name="listId" value={listId} />
            {file ? (
              <div className="relative">
                <Image
                  width={40}
                  height={40}
                  className="w-full h-24 object-cover"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                <XCircle
                  onClick={() => setFile(null)}
                  className="w-4 h-4 z-50 absolute top-0 right-0"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="image">
                  <Img className="w-4 h-4 cursor-pointer" />
                </label>
                <input
                  onChange={handleChangeFile}
                  type="file"
                  id="image"
                  hidden
                  accept="*, .png, .jpg, .jpeg, .webp"
                />
              </div>
            )}
            <div className="flex items-center gap-x-1">
              <FormSubmits>Add Card</FormSubmits>
              <Button onClick={disableEditing} size="sm" variant={"ghost"}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </>
      );
    }
    return (
      <>
        <div className="pt-2 px-2 flex items-center">
          <Button
            variant={"ghost"}
            onClick={enableTextAreaEditing}
            className="h-auto w-full justify-start text-muted-foreground text-sm"
          >
            <Plus className="w-4 h-4" />
            <p className="ml-2">Add a card</p>
          </Button>
        </div>
      </>
    );
  }
);

CardForm.displayName = "CardForm";
