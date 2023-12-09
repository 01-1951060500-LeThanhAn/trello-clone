"use client";

import { updateCardTitle } from "@/actions/update-titlecard/main";
import { FormInputs } from "@/components/forms/form-input";
import { useAction } from "@/hooks/use-actions";
import useFunc from "@/hooks/useFunc";
import { CardLists } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface HeaderProps {
  data: CardLists;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [title, setTitle] = useState(data?.title);
  const params = useParams();
  const queryClient = useQueryClient();

  const { execute } = useAction(updateCardTitle, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      toast.success(`Renamed ${data.title} success`);
      setTitle(data?.title);
    },
  });

  const { inputRef } = useFunc();

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    if (title === data.title) return;
    execute({ title, boardId, id: data.id });
  };

  useEffect(() => {
    setTitle(data?.title);
  }, [data?.title]);
  return (
    <>
      <div className="flex items-start gap-x-3 mb-6 w-full">
        <Layout className="h-5 w-5 mt-1 text-neutral-700" />
        <div className="w-full">
          <form action={onSubmit}>
            <FormInputs
              ref={inputRef}
              onBlur={onBlur}
              className="font-semibold w-[90%] text-xl px-1 text-neutral-700 bg-transparent border-transparent relative focus-visible:bg-white focus-visible:border-input mb-0.5"
              id="title"
              defaultVal={title}
            />
          </form>

          <p className="text-sm text-muted-foreground">
            In list <span className="underline">{data.title}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
