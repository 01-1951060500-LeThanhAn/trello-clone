"use client";
import { Button } from "@/components/ui/button";
import { useMobileSidebar } from "@/hooks/use-mobile-navbar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ListWorkSpace from "@/components/workspaces/list-workspaces";
import { Likes } from "@prisma/client";
import { NextPage } from "next";
import FavouriteBoard from "@/components/workspaces/list-workspace-favourite";
import Logo from "../../../logo.jpg";
import Link from "next/link";
import Image from "next/image";

interface FavouriteBoardPropsMobile {
  favouriteBoard: Likes[];
}

const MobileSidebar: NextPage<FavouriteBoardPropsMobile> = ({
  favouriteBoard,
}) => {
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
          <div className="mb-6 w-full mx-auto">
            <Link href={`/`}>
              <div className="flex items-center">
                <Image
                  className="bg-transparent h-8 w-auto"
                  src={Logo}
                  alt=""
                />
                <p className="text-2xl">Trello</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-between flex-col  mb-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="primary" className="flex items-center mb-2">
                  <p className="mr-3">WorkSpaces</p>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                className="mr-4 h-auto"
                align="start"
              >
                <ListWorkSpace />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="primary" className="flex items-center">
                  <p className="mr-3"> Marked as favourite</p>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                className="mr-4 h-auto w-[300px]"
                align="start"
              >
                <div className="">
                  {favouriteBoard.length === 0 ? (
                    <>
                      <div className="">No favourite board here !</div>
                    </>
                  ) : (
                    favouriteBoard.map((item: Likes) => (
                      <FavouriteBoard
                        favouriteBoard={favouriteBoard}
                        key={item.id}
                        item={item}
                      />
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
