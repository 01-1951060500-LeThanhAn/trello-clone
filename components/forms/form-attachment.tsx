"use client";
import { createAttachment } from "@/actions/attach/add-file/main";
import { useAction } from "@/hooks/use-actions";
import useFunc from "@/hooks/useFunc";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { FormSubmits } from "./form-submit";

interface AttachProps {
  cardId: string;
  userId: string;
  username: string;
}

const FormAttachMent: NextPage<AttachProps> = ({
  cardId,
  username,
  userId,
}) => {
  const { formRef, disableEditing } = useFunc();
  const [file, setFile] = useState<File | null>(null);

  const { execute: exeInsertFile } = useAction(createAttachment, {
    onSuccess: (data) => {
      toast.success(`Insert file "${data.file}" success`);
      console.log("Upload success");
      disableEditing();
      setFile(null);
    },
    onError: (err: any) => {
      toast.error("Insert file failed", err);
      setFile(null);
    },
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files[0] : null;
    setFile(files);
  };

  const onAddFile = async (formData: FormData) => {
    const files = formData.get("file") as any | File;

    await exeInsertFile({ file: files, cardId, userId, username });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-center">Attach Files</div>
        <p className="text-sm text-neutral-500 mt-3">
          Attach files from your computer
        </p>
        <form
          ref={formRef}
          className="my-4 w-full text-center"
          action={onAddFile}
        >
          <label
            className="h-auto px-2 py-2 text-sm bg-sky-700 text-white"
            htmlFor="file"
          >
            Upload file from computer
          </label>
          <input
            onChange={handleChangeFile}
            type="file"
            id="file"
            hidden
            accept="*"
          />

          {file && file.name && <div className="mt-4">{file.name}</div>}

          <div className="mt-6 -mb-4">
            {" "}
            <FormSubmits>Upload</FormSubmits>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormAttachMent;
