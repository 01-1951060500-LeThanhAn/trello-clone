"use client";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Datepicker } from "flowbite-react";
const DateTime = () => {
  return (
    <div className="flex items-center  mb-64">
      <Datepicker autoHide={false} />
    </div>
  );
};

export default DateTime;
