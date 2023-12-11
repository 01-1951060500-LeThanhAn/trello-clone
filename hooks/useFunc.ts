import { ElementRef, useRef, useState } from "react";
const useFunc = () => {
  const [isEditing, setEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setEditing(false);
  };

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 1000);
  };

  const enableTextAreaEditing = () => {
    setEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    }, 1000);
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  return {
    inputRef,
    formRef,
    enableEditing,
    isEditing,
    setEditing,
    disableEditing,
    textAreaRef,
    enableTextAreaEditing,
    onKeydown,
  };
};

export default useFunc;
