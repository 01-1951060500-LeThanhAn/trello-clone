import { HistoryBoard } from "@/interface";
import getSessionId from "./random";

export const addBoardHistory = (board: HistoryBoard) => {
  const sessionId = getSessionId();
  const storedBoard = localStorage.getItem(`board_${sessionId}`);

  let boardHistory: HistoryBoard[] = [];
  if (storedBoard) {
    boardHistory = JSON.parse(storedBoard) as HistoryBoard[];
  }

  const existBoard = boardHistory.find((p: HistoryBoard) => p.id === board.id);

  if (existBoard) {
    boardHistory = boardHistory.filter(
      (item: HistoryBoard) => item.id !== board.id
    );
  }

  boardHistory.push(board);
  localStorage.setItem(`board_${sessionId}`, JSON.stringify(boardHistory));
};

export const getBoardHistory = () => {
  if (typeof window !== "undefined") {
    const sessionId = getSessionId();
    const storedBoard: string | null = localStorage.getItem(
      `board_${sessionId}`
    );
    let boardHistory: HistoryBoard[] = [];

    if (storedBoard) {
      boardHistory = JSON.parse(storedBoard) as HistoryBoard[];
    }

    const results = boardHistory.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return results;
  }
  return [];
};
