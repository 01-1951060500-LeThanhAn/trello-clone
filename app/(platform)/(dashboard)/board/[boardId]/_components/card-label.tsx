import { LabelList } from "@/types";
import { NextPage } from "next";
import React from "react";

interface CardLabelProps {
  card: LabelList;
}

const CardLabel: NextPage<CardLabelProps> = ({ card }) => {
  console.log(card);
  return <div>CardLabel</div>;
};

export default CardLabel;
