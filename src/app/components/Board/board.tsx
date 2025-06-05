"use client";
import styles from "./Board.module.css";
import { useGameContext } from "../../context/GameContext";
import { useEffect, useState } from "react";
import {
  getDeveloperMoves,
  getDesignerMoves,
  getPOMoves,
  getDeveloperCaptures,
} from "../../hooks/usePieceMoves";
import { Piece } from "../../types";
import WinnerModal from "../Modal/winnerModal";
import { useRouter } from "next/navigation";
import {useBlackAIMove} from '../../hooks/useBlackAIMove'

const generateInitialBoard = (
  valueX: number,
  valueY: number
): (Piece | null)[] => {
  const newBoard: (Piece | null)[] = Array(valueX * valueY).fill(null);
  newBoard[0 * valueX + valueX - 3] = { type: "productOwner", color: "black" };
  newBoard[0 * valueX + valueX - 2] = { type: "developer", color: "black" };
  newBoard[0 * valueX + valueX - 1] = { type: "designer", color: "black" };

  const lastRow = valueY - 1;
  newBoard[lastRow * valueX + 0] = { type: "productOwner", color: "white" };
  newBoard[lastRow * valueX + 1] = { type: "developer", color: "white" };
  newBoard[lastRow * valueX + 2] = { type: "designer", color: "white" };

  return newBoard;
};

export default function Board() {
  const router = useRouter();
  const { valueX, valueY, isPlayMode, winner, setWinner } = useGameContext();
  const [board, setBoard] = useState<(Piece | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<number[]>([]);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [lastMove, setLastMove] = useState<{ from: number; to: number } | null>(
    null
  );

  const listaLetras = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
  ];

  useEffect(() => {
    setBoard(generateInitialBoard(valueX, valueY));
    setSelectedIndex(null);
    setPossibleMoves([]);
    setTurn("white");
    setLastMove(null);
  }, [valueX, valueY]);

  useEffect(() => {
    if (isPlayMode && turn === "black") {
      const timer = setTimeout(() => {
        const aiMove = useBlackAIMove(board, valueX, valueY);
        if (aiMove) {
          setBoard(aiMove.newBoard);
          setLastMove(aiMove.lastMove);
          if (aiMove.winner) {
            setWinner(aiMove.winner);
          } else {
            setTurn("white");
          }
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [turn, isPlayMode, board, valueX, valueY]);

  

  const handleClick = (index: number) => {
    if (!isPlayMode) return;

    const piece = board[index];

    if (selectedIndex !== null && possibleMoves.includes(index)) {
      const newBoard = [...board];
      const movingPiece = board[selectedIndex];

      if (movingPiece?.type === "developer") {
        const captured = getDeveloperCaptures(
          selectedIndex,
          index,
          board,
          valueX,
          valueY,
          turn
        );
        for (const idx of captured) {
          if (board[idx]?.type === "productOwner") {
            newBoard[idx] = null;
            newBoard[index] = movingPiece;
            newBoard[selectedIndex] = null;
            setBoard(newBoard);
            setLastMove({ from: selectedIndex, to: index });
            setWinner("white");
            return;
          }
          newBoard[idx] = null;
        }
      }

      if (board[index]?.type === "productOwner") {
        newBoard[index] = movingPiece;
        newBoard[selectedIndex] = null;
        setBoard(newBoard);
        setLastMove({ from: selectedIndex, to: index });
        setWinner("white");
        return;
      }

      newBoard[index] = movingPiece;
      newBoard[selectedIndex] = null;
      setBoard(newBoard);
      setLastMove({ from: selectedIndex, to: index });
      setSelectedIndex(null);
      setPossibleMoves([]);
      setTurn("black");
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
      <div style={{ textAlign: "center" }}>
        {isPlayMode && <h2>{turn}'s turn</h2>}

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

            const row = Math.floor(index / valueX);
            const col = index % valueX;
            const isDark = (row + col) % 2 === 1;

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
                    wasFrom || wasTo
                      ? "#8b5e3c"
                      : isSelected
                      ? "#a4691e"
                      : isDark
                      ? "#3d3b3b"
                      : "#646262",
                  position: "relative",
                  cursor: isPlayMode ? "pointer" : "default",
                  transition: "background-color 0.3s ease",
                }}
              >
                {isMove && (
                  <div
                    style={{
                      backgroundColor: "#d98337",
                      borderRadius: "50%",
                      width: "20%",
                      height: "20%",
                      position: "absolute",
                    }}
                  />
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
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      color: "white",
                      fontSize: "clamp(0.4rem, 1vw, 0.8rem)",
                    }}
                  >
                    {listaLetras[index % valueX]}
                  </div>
                )}
                {index % valueX === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "2px",
                      color: "white",
                      fontSize: "clamp(0.4rem, 1vw, 0.8rem)",
                    }}
                  >
                    {valueY - Math.floor(index / valueX)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {winner && (
        <WinnerModal
            onRestart={() => {
            setBoard(generateInitialBoard(valueX, valueY));
            setTurn("white");
            setLastMove(null);
            setWinner(null);
            setSelectedIndex(null);
            setPossibleMoves([]);
            router.push(`/play`);
          }}
          onGoHome={() => {
            router.push(`/`);
          }}
        />
      )}
    </div>
  );
}
