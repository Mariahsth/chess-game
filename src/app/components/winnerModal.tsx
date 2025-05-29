import React from "react";

interface WinnerModalProps {
  winner: "white" | "black";
  onRestart: () => void;
  onGoHome: () => void;
}

export default function WinnerModal({ winner, onRestart, onGoHome }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] text-white p-8 rounded-2xl shadow-lg w-[320px] text-center border border-white/10">
        <div className="mb-4">
          <div className="mx-auto w-12 h-12 bg-gradient-to-tr from-white to-purple-400 rounded-xl flex items-center justify-center">
            ⭐
          </div>
          <h2 className="mt-4 text-xl font-bold">{winner.toUpperCase()} PIECES WON!</h2>
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={onGoHome}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition"
          >
            Go Back To Home
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Start New Match
          </button>
        </div>
      </div>
    </div>
  );
}
