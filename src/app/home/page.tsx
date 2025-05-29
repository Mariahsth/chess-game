"use client";
import { useState } from "react";
import styles from "./Home.module.css";
import { useRouter } from 'next/navigation';
import { useGameContext } from "../context/GameContext";
import Board from "../components/board";

export default function Home() {
  
  const { valueX, valueY, setValueX, setValueY } = useGameContext();
  const [check, setCheck] = useState(false);
  const router = useRouter();

  function checkScale() {
    if (valueX < 6 || valueX > 12 || valueY < 6 || valueY > 12) {
      alert("The board dimension must be between 6 and 12 squares");
      return;
    }
    setCheck(true);
  }
  function checkPlay() {
    if (!check) {
      alert("You need to confirm board scale first");
      return;
    } else {
      alert("Let's Play!");
      router.push(`/play`);
    }
  }

  return (
    <>
      <div className={styles.page}>
        <Board/>
        
        <div className={styles.div_buttons}>
          <div className={styles.div_scale_check}>
            <div className={styles.div_scale}>
              <p>Scale </p>
              <p style={{ color: "#FAFAFA" }}> X</p>
              <input
                type="number"
                min="6"
                max="12"
                value={valueX}
                onChange={(e) => setValueX(Number(e.target.value))}
              />
              <p style={{ color: "#FAFAFA" }}>Y</p>
              <input
                type="number"
                min="6"
                max="12"
                value={valueY}
                onChange={(e) => setValueY(Number(e.target.value))}
              />
            </div>
            <button className={`${styles.check} ${check ? styles.checkActive : ''}`} onClick={checkScale}>
              ✔
            </button>
          </div>
          <button className={styles.play_button} onClick={checkPlay}>
            Play
          </button>
        </div>
      </div>
    </>
  );
}
