import { Piece } from "../types";

export function getXY(index: number, valueX: number) {
  return [index % valueX, Math.floor(index / valueX)];
}

export function getIndex(x: number, y: number, valueX: number) {
  return y * valueX + x;
}

export function isInsideBoard(x: number, y: number, valueX: number, valueY: number) {
  return x >= 0 && x < valueX && y >= 0 && y < valueY;
}

export function getDeveloperMoves(
  index: number,
  board: (Piece | null)[],
  valueX: number,
  valueY: number,
  color: "white" | "black"
): number[] {
  const [x, y] = getXY(index, valueX);
  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [-1, -1], [1, -1], [-1, 1],
  ];
  const validMoves: number[] = [];

  for (const [dx, dy] of directions) {
    for (let step = 1; step <= 3; step++) {
      const nx = x + dx * step;
      const ny = y + dy * step;

      if (!isInsideBoard(nx, ny, valueX, valueY)) break;

      const targetIdx = getIndex(nx, ny, valueX);
      const targetPiece = board[targetIdx];

      if (targetPiece) {
        // Não adiciona a posição ocupada como válida,
        // mas continua o loop para verificar próximas casas (pular por cima)
        continue;
      }

      validMoves.push(targetIdx);
    }
  }

  return validMoves;
}

export function getDeveloperCaptures(
  fromIndex: number,
  toIndex: number,
  board: (Piece | null)[],
  valueX: number,
  valueY: number,
  color: "white" | "black"
): number[] {
  const [x1, y1] = getXY(fromIndex, valueX);
  const [x2, y2] = getXY(toIndex, valueX);
  const dx = Math.sign(x2 - x1);
  const dy = Math.sign(y2 - y1);
  const captured: number[] = [];

  for (let i = 1; i < 3; i++) {
    const nx = x1 + dx * i;
    const ny = y1 + dy * i;
    if (!isInsideBoard(nx, ny, valueX, valueY)) break;

    const idx = getIndex(nx, ny, valueX);
    if (idx === toIndex) break;

    const piece = board[idx];
    if (piece && piece.color !== color) {
      captured.push(idx);
    }
  }

  return captured;
}

export function getDesignerMoves(
  index: number,
  board: (Piece | null)[],
  valueX: number,
  valueY: number,
  color: "white" | "black"
): number[] {
  const [x, y] = getXY(index, valueX);
  const patterns = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2],
  ];
  return patterns
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => isInsideBoard(nx, ny, valueX, valueY))
    .map(([nx, ny]) => getIndex(nx, ny, valueX))
    .filter((i) => !board[i] || board[i]?.color !== color);
}

export function getPOMoves(
  index: number,
  board: (Piece | null)[],
  valueX: number,
  valueY: number,
  color: "white" | "black"
): number[] {
  const [x, y] = getXY(index, valueX);
  const deltas = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [-1, -1], [1, -1], [-1, 1],
  ];
  return deltas
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => isInsideBoard(nx, ny, valueX, valueY))
    .map(([nx, ny]) => getIndex(nx, ny, valueX))
    .filter((i) => !board[i] || board[i]?.color !== color);
}
