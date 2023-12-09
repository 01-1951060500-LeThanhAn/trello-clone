import { KeyboardEventHandler } from "react";

export interface SidebarProps {
  storageKey?: string;
}

export type Organizations = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

export type State = {
  error?: {
    title?: string;
  };
  message?: string | null;
};
export interface FormInputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultVal?: string;
  onBlur?: () => void;
}

export interface FormTextAreaProps {
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultVal?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export interface CommentProps {
  id: string;
  order: number;
  content: string;
  imageUrl: string | undefined;
  fullName: string;
  userId: string;
  cardId: string;
  createdAt: string;
}
