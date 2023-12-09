"use client";
import { Button } from "@/components/ui/button";
import { useModelCard } from "@/hooks/useModelCard";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Info = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-end gap-x-4">
          <div className="w-[54px] h-[54px] relative">
            <Image
              className="rounded-md object-cover"
              src={organization?.imageUrl!}
              alt="Organization"
              fill
            />
          </div>

          <div className="space-y-1">
            <p className=" text-xl font-semibold">{organization?.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <CreditCard />
              Free
            </div>
          </div>
        </div>
        <Button role="button" className="ml-auto" variant="primary">
          <Link href={`/organization/${organization?.id}/add`}>
            Add members
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Info;
