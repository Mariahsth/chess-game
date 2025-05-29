"use client";
import styles from "./Home.module.css";
import { useRouter } from 'next/navigation';


export default function Home() {
  

  const router = useRouter();


  return (
    <>
      <div className={styles.page}>
        <h1>Welcome to the Game</h1>
        <div className={styles.info_container}>
            <div>
                
                <img src={`/images/Chess6x6.png`} alt="Chess board" style={{width:'85%'}}/>
            </div>
            <div className={styles.buttons_container}>
                <p>This is a custom chess game. </p>
                <button className={styles.buttons} onClick={() => router.push(`/rules`)}>How to Play</button>
                <button className={styles.buttons} onClick={() => router.push(`/settings`)}>Start the Game</button>
            </div>

        </div>
        
      </div>
    </>
  );
}
