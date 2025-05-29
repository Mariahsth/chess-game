"use client";
import styles from "./Board.module.css";
import { useGameContext } from "../context/GameContext";
import { useEffect, useState } from "react";
import {
  getDeveloperMoves,
  getDesignerMoves,
  getPOMoves,
  getDeveloperCaptures,
} from "../hooks/usePieceMoves";

export type Piece = {
  type: "developer" | "designer" | "productOwner";
  color: "white" | "black";
};

export default function Board() {
  const { valueX, valueY, isPlayMode } = useGameContext();
  const [board, setBoard] = useState<(Piece | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<number[]>([]);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [lastMove, setLastMove] = useState<{ from: number; to: number } | null>(null);

  const listaLetras = ["A","B","C","D","E","F","G","H","I","J","K","L"];

  useEffect(() => {
    const newBoard: (Piece | null)[] = Array(valueX * valueY).fill(null);
    newBoard[0 * valueX + valueX - 3] = { type: "productOwner", color: "black" };
    newBoard[0 * valueX + valueX - 2] = { type: "developer", color: "black" };
    newBoard[0 * valueX + valueX - 1] = { type: "designer", color: "black" };
    const lastRow = valueY - 1;
    newBoard[lastRow * valueX + 0] = { type: "productOwner", color: "white" };
    newBoard[lastRow * valueX + 1] = { type: "developer", color: "white" };
    newBoard[lastRow * valueX + 2] = { type: "designer", color: "white" };
    setBoard(newBoard);
    setSelectedIndex(null);
    setPossibleMoves([]);
    setTurn("white");
    setLastMove(null);
  }, [valueX, valueY]);

  useEffect(() => {
    if (turn === "black") {
      const timer = setTimeout(() => makeBlackMove(), 1000);
      return () => clearTimeout(timer);
    }
  }, [turn]);


  const isEnemy = (from: Piece, to: Piece | null) => to && from.color !== to.color;

  const filterValidMoves = (from: Piece, indices: number[]) =>
    indices.filter(idx => !board[idx] || isEnemy(from, board[idx]));


  const makeBlackMove = () => {
    const blackPieces = board
      .map((piece, index) => ({ piece, index }))
      .filter(({ piece }) => piece && piece.color === "black")
      .map(({ piece, index }) => {
        let moves: number[] = [];
        if (piece?.type === "developer") {
          moves = getDeveloperMoves(index, board, valueX, valueY, "black");
        } else if (piece?.type === "designer") {
          moves = getDesignerMoves(index, board, valueX, valueY, "black");
        } else if (piece?.type === "productOwner") {
          moves = getPOMoves(index, board, valueX, valueY, "black");
        }
        return { piece, index, moves };
      })
      .filter(({ moves }) => moves.length > 0);
  
    if (blackPieces.length === 0) return;
  
    const { index, moves } = blackPieces[Math.floor(Math.random() * blackPieces.length)];
    const move = moves[Math.floor(Math.random() * moves.length)];
  
    const newBoard = [...board];
    newBoard[move] = board[index];
    newBoard[index] = null;
    setBoard(newBoard);
    setLastMove({ from: index, to: move });
    setTimeout(() => setLastMove(null), 3000);
    setTurn("white");
  };

  const handleClick = (index: number) => {
    const piece = board[index];
  
    if (selectedIndex !== null && possibleMoves.includes(index)) {
      const piece = board[selectedIndex];
      const newBoard = [...board];
    
      // Se a peça for Developer, calcular capturas no caminho
      if (piece?.type === "developer") {
        const captured = getDeveloperCaptures(selectedIndex, index, board, valueX, valueY, turn);
        for (const idx of captured) {
          newBoard[idx] = null; // Remove peças capturadas
        }
      }
    
      newBoard[index] = newBoard[selectedIndex];
      newBoard[selectedIndex] = null;
    
      setBoard(newBoard);
      setLastMove({ from: selectedIndex, to: index });
      setSelectedIndex(null);
      setPossibleMoves([]);
      setTurn(turn === "white" ? "black" : "white");
      return;
    }
  
    if (!piece || piece.color !== turn) return;
  
    let moves: number[] = [];
  
    if (piece.type === "developer") {
      moves = getDeveloperMoves(index, board, valueX, valueY, turn);
    } else if (piece.type === "designer") {
      moves = getDesignerMoves(index, board, valueX, valueY, turn);
    } else if (piece.type === "productOwner") {
      moves = getPOMoves(index, board, valueX, valueY, turn);
    }
  
    setSelectedIndex(index);
    setPossibleMoves(moves);
  };

  return (
    <div className={styles.page}>
      <div
        className={styles.board_dynamic}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${valueX}, minmax(0, 1fr))`,
          maxWidth: "90vmin",
          maxHeight: "90vmin",
          aspectRatio: `${valueX} / ${valueY}`,
          margin: "20px auto",
          border: "5px solid #3d3b3b",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: valueX * valueY }).map((_, index) => {
          const piece = board[index];
          const isMove = possibleMoves.includes(index);
          const isSelected = selectedIndex === index;
          const wasFrom = lastMove?.from === index;
          const wasTo = lastMove?.to === index;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  wasFrom || wasTo ? "#8b5e3c"
                    : isSelected ? "#a4691e"
                    : (Math.floor(index / valueX) + index) % 2 === 0
                    ? "#646262" : "#3d3b3b",
                position: "relative",
                cursor: isPlayMode ? "pointer" : "default",
                transition: "background-color 0.3s ease",
              }}
            >
              {isMove && (
                <div style={{
                  backgroundColor: '#d98337',
                  borderRadius: '50%',
                  width: '20%',
                  height: '20%',
                  position: "absolute"
                }} />
              )}
              {piece && (
                <img
                  src={`/images/${piece.type}-${piece.color}.png`}
                  alt={`${piece.color} ${piece.type}`}
                  style={{
                    width: "70%",
                    height: "70%",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              )}
              {index >= valueX * (valueY - 1) && (
                <div style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  color: "white",
                  fontSize: "clamp(0.4rem, 1vw, 0.8rem)",
                }}>{listaLetras[index % valueX]}</div>
              )}
              {index % valueX === 0 && (
                <div style={{
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  color: "white",
                  fontSize: "clamp(0.4rem, 1vw, 0.8rem)",
                }}>{valueY - Math.floor(index / valueX)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
