import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import React from "react";

const MarketingPage = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="flex items-center justify-center flex-col">
          <div className="flex text-amber-700 shadow-sm items-center bg-amber-200 border p-4 cursor-pointer">
            <Medal className="h-6 w-6 mr-2" />
            Study, learn more, learn forever
          </div>

          <h1 className="text-3xl md:text-4xl text-center my-5 text-neutral-800">
            Trello makes it easier for teams to
          </h1>

          <div className="text-base text-center md:text-4xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md  w-fit">
            manage projects and tasks
          </div>
        </div>

        <div className="text-center px-2 max-w-md mt-4 md:max-w-2xl text-base md:text-lg  mx-auto">
          Trello is a visual work management tool that helps teams ideate, plan,
          manage, and celebrate achievements together in a collaborative,
          efficient, and organized way.
        </div>

        <div className="mt-4">
          <Button>Get Started</Button>
        </div>
      </div>
      ;
    </>
  );
};

export default MarketingPage;
