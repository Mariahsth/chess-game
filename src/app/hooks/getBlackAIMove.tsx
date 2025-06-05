// Renomeie o arquivo para: getBlackAIMove.ts
import { Piece } from "../types";
import {
  getDeveloperMoves,
  getDesignerMoves,
  getPOMoves,
  getDeveloperCaptures,
} from "./usePieceMoves";

interface AIMoveResult {
  newBoard: (Piece | null)[];
  lastMove: { from: number; to: number };
  winner?: "white" | "black";
}

export function getBlackAIMove(
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
      const boardCopy = [...board]; 
      const movingPiece = boardCopy[i];
    
      let score = 1;
      let winner: "black" | undefined;
    
      if (movingPiece?.type === "developer") {
        const captured = getDeveloperCaptures(i, move, board, valueX, valueY, "black");
        score += captured.length * 10;
        for (const idx of captured) {
          if (board[idx]?.type === "productOwner") {
            winner = "black";
          }
          boardCopy[idx] = null;
        }
      }
    
      const target = board[move];
      if (target?.type === "productOwner") {
        winner = "black";
        score += 100;
      } else if (target?.color === "white") {
        score += 10;
      }
    
      boardCopy[move] = movingPiece;
      boardCopy[i] = null;
    
      allMoves.push({
        from: i,
        to: move,
        score,
        newBoard: boardCopy,
        winner,
      });
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
