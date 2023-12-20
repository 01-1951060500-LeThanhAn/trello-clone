"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { pdfjs } from "react-pdf";
import { NextPage } from "next";
import Logo from "@/public/pdf.png";
import Image from "next/image";
export interface FileProps {
  id: string;
  pdf: string;
}

interface AttachProps {
  show: string;
  setShow: (show: string) => void;
  cardId: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ListAttachFile: NextPage<AttachProps> = ({ show, setShow, cardId }) => {
  const [files, setFiles] = useState<FileProps[]>([]);

  useEffect(() => {
    const getAllFile = async () => {
      const res = await axios.get(`https://trello-qlnm.onrender.com/get-files`);
      console.log(res.data.data);
      setFiles(res.data.data);
    };

    getAllFile();
  }, []);

  const showPdf = (pdf: any) => {
    window.open(
      `https://trello-qlnm.onrender.com/files/${pdf}`,
      "_blank",
      "noreferrer"
    );
  };

  return (
    <>
      <div>
        <>
          {show === cardId &&
            cardId &&
            files &&
            files.map((file) => (
              <div className="flex items-centers">
                <div>
                  <Image
                    className="w-8 h-8 object-contain mt-2"
                    src={Logo}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                <div className="my-2 ml-auto lg:ml-2 max-w-12">
                  <Button
                    variant={"ghost"}
                    className="bg-neutral-300"
                    key={file.id}
                    onClick={() => showPdf(file.pdf)}
                  >
                    <p>
                      {file.pdf.length > 45
                        ? file.pdf.slice(0, 45) + ".pdf"
                        : file.pdf}
                    </p>
                  </Button>
                </div>
              </div>
            ))}
        </>
      </div>
    </>
  );
};

export default ListAttachFile;
