"use client";
import styles from "./Play.module.css";
import { useRouter } from "next/navigation";
import { useGameContext } from "../context/GameContext";
import { useState } from "react";

export default function Play() {
  const { valueX, valueY } = useGameContext();

  const initialBoard: (Piece | null)[] = Array(valueX * valueY).fill(null);

  const [pieces, setPieces] = useState<(Piece | null)[]>(initialBoard);

  const router = useRouter();
  const listaLetras: (string | null)[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];

  type Piece = {
    type: string;
    color: "white" | "black";
  };

  type Square = Piece | null;

  // Adiciona peças pretas
  initialBoard[valueX - 1] = { type: "productOwner", color: "black" };
  initialBoard[valueX - 2] = { type: "developer", color: "black" };
  initialBoard[valueX - 3] = { type: "designer", color: "black" };
  // Adiciona peças brancas
  initialBoard[valueX * valueY - valueX] = {
    type: "productOwner",
    color: "white",
  };
  initialBoard[valueX * valueY - valueX + 1] = {
    type: "developer",
    color: "white",
  };
  initialBoard[valueX * valueY - valueX + 2] = {
    type: "designer",
    color: "white",
  };

  return (
    <>
      <div className={styles.page}>
        <div
          className={styles.board_dynamic}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${valueX}, minmax(0, 1fr))`,
            maxWidth: "90vwmin",
            maxHeight: "90vmin",
            aspectRatio: `${valueX} / ${valueY}`,
            marginTop: "20px auto",
            border: "5px solid #3d3b3b",
            gridAutoRows: "1fr",
            borderRadius: "8px",
            overflow: "hidden",
            boxSizing: "border-box",
            placeItems: "center",
          }}
        >
          {Array.from({ length: valueX * valueY }).map((_, index) => {
            const piece = pieces[index];

            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  aspectRatio: "1 / 1",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.2rem",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                  backgroundColor:
                    (Math.floor(index / valueX) + index) % 2 === 0
                      ? "#646262"
                      : "#3d3b3b",
                  position: "relative",
                }}
              >
                {piece && (
                  <img
                    src={`/images/${piece.type}-${piece.color}.png`}
                    alt={`${piece.color} ${piece.type}`}
                    style={{ width: "70%", height: "70%", objectFit: "contain", pointerEvents: "none" }}
                  />
                )}

                {/* Letra na última linha */}
                {index >= valueX * (valueY - 1) && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      color: "white",
                      fontSize: "clamp(0.4rem, 1vw, 0.8rem)"
                    }}
                  >
                    {listaLetras[index % valueX]}
                  </div>
                )}

                {/* Número na primeira coluna */}
                {index % valueX === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "2px",
                      color: "white",
                      fontSize: "clamp(0.4rem, 1vw, 0.8rem)"
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
    </>
  );
}
