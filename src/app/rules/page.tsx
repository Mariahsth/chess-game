"use client";
import Pieces from "../components/Pieces";
import styles from "./Rules.module.css";
import { useRouter } from 'next/navigation';


export default function Rules() {
  
  const router = useRouter();


  return (
    <>
      <div className={styles.page}>
        <h2>How to play</h2>
        <div>
          <div className={styles.board_container}>
            <h3>The Board</h3>
            <img src={`/images/Chess6x6.png`} alt="Chess board" className={styles.image}/>
            <p>The game board can have custom dimensions defined by the user before the game starts. </p>
            <p>The board dimensions must be between 6 and 12 squares (vertically and horizontally).</p>
          </div>
        </div>
        <Pieces/>
        <div className={styles.win_container}>
          <div className={styles.win_title}>
            <h3>How to Win the Game</h3>
          </div>
          <div className={styles.win_text}>
            <p>You are in the white team</p>
            <p>You must <strong>protect</strong> your Product Owner</p>
            <img src='/images/productOwner-white.png' alt="White Product Owner" style={{width:'3rem', marginBottom:'2em'}}/>
            <p>You start the game </p>
            <p>To win the game you must <strong>capture </strong>the Product Owner of your adversary</p>
            <img src='/images/productOwner-black.png' style={{width:'3rem'}} alt="Black Product Owner"/>


          </div>

        </div>
        <button
            onClick={() => router.push(`/`)}
            className={styles.button_home}
            
          >
            Go Back To Home
          </button>
      </div>
    </>
  );
}
