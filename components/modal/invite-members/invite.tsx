import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModelCard } from "@/hooks/useModelCard";
import React from "react";

const InviteMembers = () => {
  const { isOpen, onClose } = useModelCard();
  return (
    <>
      <Dialog onOpenChange={onClose} open={isOpen}>
        <DialogContent>Members</DialogContent>
      </Dialog>
    </>
  );
};

export default InviteMembers;
