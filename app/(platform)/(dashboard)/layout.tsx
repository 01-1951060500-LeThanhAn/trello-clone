import React from "react";
import Navbar from "./_components/navbar";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { orgId, userId } = auth();

  if (!orgId) {
    redirect(`/select-org`);
  }

  const favouriteBoard = await db.likes.findMany({
    where: {
      userId: userId,
    },
  });

  if (!favouriteBoard) {
    notFound();
  }

  return (
    <>
      <div className="h-full">
        <Navbar favouriteBoard={favouriteBoard} />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
