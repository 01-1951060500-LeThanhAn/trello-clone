import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { BellIcon, Plus, SearchIcon } from "lucide-react";
import React from "react";
import MobileSidebar from "./sidebar-mobile";
import FormPopover from "@/components/forms/form-popover";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../logo.jpg";
import { Input } from "@/components/ui/input";
const Navbar = () => {
  return (
    <nav className="fixed  z-50 top-0 w-full px-6 h-14 boder-b border-1 shadow-sm bg-white flex items-center">
      <MobileSidebar />
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
      </div>

      <div className="hidden md:block relative ml-auto ">
        <Input className="outline-none w-[300px]" />
        <SearchIcon className="w-6 h-6 absolute top-2 cursor-pointer right-2 text-neutral-700" />
      </div>
      <div className="flex items-center ml-auto mt-2 gap-x-2">
        <BellIcon className="w-6 h-6 mr-2" />
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
