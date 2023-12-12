import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";
import MobileSidebar from "./sidebar-mobile";
import FormPopover from "@/components/forms/form-popover";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../logo.jpg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ListWorkSpace from "@/components/workspaces/list-workspaces";
import { NextPage } from "next";
import { Likes } from "@prisma/client";
import FavouriteBoard from "@/components/workspaces/list-workspace-favourite";

interface FavouriteBoardProps {
  favouriteBoard: Likes[];
}
const Navbar: NextPage<FavouriteBoardProps> = ({ favouriteBoard }) => {
  return (
    <nav className="fixed  z-50 top-0 w-full px-6 h-14 boder-b border-1 shadow-sm bg-white flex items-center">
      <MobileSidebar favouriteBoard={favouriteBoard} />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Link href={`/`}>
            {" "}
            <div className="flex items-center">
              <Image className="bg-transparent h-8 w-auto" src={Logo} alt="" />
              <p className="">Trello</p>
            </div>
          </Link>
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            variant="primary"
            className="rounded-sm hidden md:block h-auto py-2 px-2"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button size="sm" className="rounded-sm blcok md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary" className="md:flex items-center hidden">
              <p className="mr-3">WorkSpaces</p>
            </Button>
          </PopoverTrigger>

          <PopoverContent side="bottom" className="mr-4 h-auto" align="start">
            <ListWorkSpace />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary" className="md:flex items-center hidden">
              <p className="mr-3"> Marked as favourite</p>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            className="mr-4 h-auto w-auto"
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

      <div className="flex items-center ml-auto mt-2 gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {},
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
