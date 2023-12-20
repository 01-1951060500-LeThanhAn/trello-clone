"use client";
import { createAttachment } from "@/actions/attach/add-file/main";
import { useAction } from "@/hooks/use-actions";
import useFunc from "@/hooks/useFunc";
import { NextPage } from "next";
import React, { useState } from "react";
import { toast } from "sonner";
import { FormSubmits } from "./form-submit";
import axios from "axios";

interface AttachProps {
  cardId: string;
  userId: string;
  username: string;
  show: string;
  setShow: (show: string) => void;
}

const FormAttachMent: NextPage<AttachProps> = ({
  cardId,
  username,
  userId,
  show,
  setShow,
}) => {
  const { formRef, disableEditing } = useFunc();
  const [file, setFile] = useState<any | null>(null);

  const { execute: exeInsertFile } = useAction(createAttachment, {
    onSuccess: (data) => {
      toast.success(`Insert file  success`);
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
    try {
      const cardId = formData.get("cardId") as string;
      let results:
        | FormData
        | any
        | { username: string; cardId: string; boardId: string; file?: any } = {
        username,
        cardId,
        file,
      };
      const formDatas = new FormData() as any;
      formDatas.append("file", file);

      const res = await axios.post(
        `https://trello-qlnm.onrender.com/upload-file`,
        formDatas
      );
      console.log(res.data);
      setShow(results.cardId);
      exeInsertFile({ ...results, file: res.data?.pdf });
    } catch (error) {
      console.log(error);
    }
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
            accept="application/pdf"
            required
          />
          <input hidden id="cardId" name="cardId" value={cardId} />
          {file && <div className="mt-4">{file.name}</div>}

          <div className="mt-6 -mb-4">
            {" "}
            <FormSubmits>Upload</FormSubmits>
          </div>
        </form>
      </div>
      .
    </>
  );
};

export default FormAttachMent;
