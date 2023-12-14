import { Card, Label, List } from "@prisma/client";

export type ListCards = List & { cards: Card[] };
export type CardLists = Card & { lists: List[] };
export type LabelList = Card & { labels: Label[] };
