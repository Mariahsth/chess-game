"use client";
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
            <img src={`/images/Chess6x6.png`} alt="Chess board" className={styles.image}/>
            <div className={styles.board_text_container}>
              <h3>The Board</h3>
              <p>The game board can have custom dimensions defined by the user before the game starts. </p>
              <p>The board dimensions must be between 6 and 12 squares (vertically and horizontally).</p>
            </div>
          </div>
        </div>
        <div className={styles.pieces_container}>
          <div className={styles.pieces_title}>
            <h3>The Pieces</h3>

          </div>
          <div className={styles.piece_container}>
            <div className={styles.piece_text_container}>
              <h4>The ”Developer” </h4>
              <h5>Movement</h5>
              <p>Can jump up to 3 squares per turn</p>
              <p>Can jump to any direction (vertical, horizontal, or diagonal)</p>
              <h5>Capture</h5>
              <p>Captures other pieces by jumping above them</p>
              <p>Can NOT jump to squares that are already occupied</p>
            </div>
            <div className={styles.piece_images_container}>
              <img src='/images/developer-white.png' alt="Developer" className={styles.piece_image}/>
              <img src='/images/developer-black.png' alt="Developer" className={styles.piece_image}/>
            </div>

          </div>
          <div className={styles.piece_container}>
            <div className={styles.piece_images_container}>
              <img src='/images/designer-white.png' alt="Designer" className={styles.piece_image}/>
              <img src='/images/designer-black.png' alt="Designer" className={styles.piece_image}/>
            </div>
            <div className={styles.piece_text_container}>
              <h4>The ”Designer” </h4>
              <h5>Movement</h5>
              <p>Can jump in an ”L” shape</p>
              <h5>Capture</h5>
              <p>Captures other pieces by moving on top of them</p>
            </div>
          </div>
          <div className={styles.piece_container}>
            <div className={styles.piece_text_container}>
              <h4>The ”Product Owner”  </h4>
              <h5>Movement</h5>
              <p>Can move one square per turn</p>
              <p>Can move to any direction (vertical, horizontal, or diagonal)</p>
              <h5>Capture</h5>
              <p>Captures other pieces by moving on top of them</p>
            </div>
            <div className={styles.piece_images_container}>
              <img src='/images/productOwner-white.png' alt="Designer" className={styles.piece_image}/>
              <img src='/images/productOwner-black.png' alt="Designer" className={styles.piece_image}/>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.win_title}>
            <h3>How to win</h3>
          </div>
          <div className={styles.win_text}>
            <p>You are in the white team</p>
            <p>The first turn is for the white </p>
            <p>To win the game you must capture the <strong>Product Owner</strong> of your adversary</p>

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
