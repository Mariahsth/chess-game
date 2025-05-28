'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type GameContextType = {
  valueX: number;
  valueY: number;
  setValueX: (x: number) => void;
  setValueY: (y: number) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [valueX, setValueX] = useState(6);
  const [valueY, setValueY] = useState(6);

  return (
    <GameContext.Provider value={{ valueX, valueY, setValueX, setValueY }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameContext must be used within GameProvider');
  return context;
}
