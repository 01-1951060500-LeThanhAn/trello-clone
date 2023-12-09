import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/app/logo.jpg";
const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 w-full px-4 h-14 border-b shadow-sm bg-white flex items-center">
        <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
          <div className="hidden md:block md:flex md:items-center">
            <Image alt="" src={Logo} className="w-auto h-8 bg-transparent" />
            <p>Trello Clone</p>
          </div>
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            <Button size="sm" variant="outline" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Link href="/sign-up">
              <Button>Get Trello for free</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
