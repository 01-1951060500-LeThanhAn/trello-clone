import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 w-full p-4 border-t shadow-md bg-slate-100 ">
        <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
          <div className="hidden md:block">
            <Github className="w-12 h-12 p-2 rounded-full bg-neutral-700 text-[#eed4d4]" />
          </div>
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            <Button size="sm" variant="ghost">
              Privacy Policy
            </Button>

            <Button size="sm" variant="ghost">
              Term of service
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
