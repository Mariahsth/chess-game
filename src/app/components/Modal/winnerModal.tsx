import React from "react";
import styles from "./Modal.module.css";
import { FaStar } from 'react-icons/fa';

interface WinnerModalProps {
  winner: "white" | "black";
  onRestart: () => void;
  onGoHome: () => void;
}

export default function WinnerModal({ winner, onRestart, onGoHome }: WinnerModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.main_container}>
        <div className={styles.winner_container}>
          <div className={styles.star_container}>
            <FaStar size={32} className={styles.star} />
          </div>
          <h2 >{winner.toUpperCase()} PIECES WON!</h2>
        </div>
        <div className={styles.buttons_container}>
          <button
            onClick={onGoHome}
            className={styles.buttons_home}
            
          >
            Go Back To Home
          </button>
          <button
            onClick={onRestart}
            className={styles.buttons_restart}
            
          >
            Start New Match
          </button>
        </div>
      </div>
    </div>
  );
}
