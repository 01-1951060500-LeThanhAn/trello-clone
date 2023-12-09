"use client";

import React, { useEffect, useState } from "react";
import CardModal from "../modal/modal-provider";

const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CardModal />
    </>
  );
};

export default ModalProviders;
