"use client";
import Board from "../components/Board/board";
import { useEffect } from "react";
import { useGameContext } from "../context/GameContext";

export default function Play() {
  const { setIsPlayMode } = useGameContext();

  useEffect(() => {
    setIsPlayMode(true);
    return () => setIsPlayMode(false); // reseta quando sai
  }, []);

  return <Board />;
}
