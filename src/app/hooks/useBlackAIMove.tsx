import { Piece } from "../types";
import { getDeveloperMoves, getDesignerMoves, getPOMoves, getDeveloperCaptures } from "./usePieceMoves";

interface AIMoveResult {
  newBoard: (Piece | null)[];
  lastMove: { from: number; to: number };
  winner?: "white" | "black";
}

export function useBlackAIMove(
  board: (Piece | null)[],
  valueX: number,
  valueY: number
): AIMoveResult | null {
  const allMoves: {
    from: number;
    to: number;
    score: number;
    newBoard: (Piece | null)[];
    winner?: "white" | "black";
  }[] = [];


  
  for (let i = 0; i < board.length; i++) {
    const piece = board[i];
    if (!piece || piece.color !== "black") continue;

    let possibleMoves: number[] = [];

    if (piece.type === "developer") {
      possibleMoves = getDeveloperMoves(i, board, valueX, valueY, "black");
    } else if (piece.type === "designer") {
      possibleMoves = getDesignerMoves(i, board, valueX, valueY, "black");
    } else if (piece.type === "productOwner") {
      possibleMoves = getPOMoves(i, board, valueX, valueY, "black");
    }

    for (const move of possibleMoves) {
      const target = board[move];
      let score = 1;

      const newBoard = [...board];
      const movingPiece = newBoard[i];

      if (movingPiece?.type === "developer") {
        const captured = getDeveloperCaptures(i, move, board, valueX, valueY, "black");
        score += captured.length * 10; // 10 pontos por peça capturada
        for (const idx of captured) {
          newBoard[idx] = null;
        }
      }

      if (target?.color === "white") {
        score += target.type === "productOwner" ? 100 : 10;
      }

      if (target?.type === "productOwner") {
        newBoard[move] = movingPiece;
        newBoard[i] = null;
        console.log("💥 AI capturou o Product Owner!", { from: i, to: move, score });
        allMoves.push({ from: i, to: move, score: 1000, newBoard, winner: "black" });
        continue;
      }

      newBoard[move] = movingPiece;
      newBoard[i] = null;

      console.log("📍 AI avaliou movimento", { from: i, to: move, score });
      allMoves.push({ from: i, to: move, score, newBoard });
    }
  }

  if (allMoves.length === 0) return null;

  allMoves.sort((a, b) => b.score - a.score);
  const best = allMoves[0];

  return {
    newBoard: best.newBoard,
    lastMove: { from: best.from, to: best.to },
    winner: best.winner,
  };
}
