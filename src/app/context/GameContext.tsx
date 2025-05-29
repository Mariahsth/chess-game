"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type GameContextType = {
  valueX: number;
  valueY: number;
  isPlayMode: boolean;
  setValueX: (x: number) => void;
  setValueY: (y: number) => void;
  setIsPlayMode: (mode: boolean) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [valueX, setValueX] = useState(6);
  const [valueY, setValueY] = useState(6);
  const [isPlayMode, setIsPlayMode] = useState(false);

  return (
    <GameContext.Provider
      value={{ valueX, valueY, isPlayMode, setValueX, setValueY, setIsPlayMode }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGameContext must be used within a GameProvider");
  return context;
};
