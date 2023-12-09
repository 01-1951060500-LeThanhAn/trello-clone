import ModalProviders from "@/components/providers/provider-modal";
import QueryProvider from "@/components/providers/query/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "sonner";
const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkProvider>
        <QueryProvider>
          <Toaster />
          <ModalProviders />
          {children}
        </QueryProvider>
      </ClerkProvider>
    </>
  );
};

export default PlatFormLayout;
