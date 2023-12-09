"use client";
import { Button } from "@/components/ui/button";
import { useMobileSidebar } from "@/hooks/use-mobile-navbar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsmounted] = useState(false);
  const { onOpen, onClose, isOpen } = useMobileSidebar((state) => state);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Button
        size={"sm"}
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant={"ghost"}
      >
        <Menu className="w-5 h-5" />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-4 pt-12">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
