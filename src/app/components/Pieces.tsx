"use client";
import styles from "./Pieces.module.css";


export default function Pieces() {
    const pieces=[
        {
        title:"Developer",
        imageTitle:"developer",
        movement:"Can jump up to 3 squares per turn-Can jump to any direction (vertical, horizontal, or diagonal)",
        capture:"Captures other pieces by jumping above them-Can NOT jump to squares that are already occupied",
        },
        {
        title:"Designer",
        imageTitle:"designer",
        movement:"Can jump in an ”L” shape-",
        capture:"Captures other pieces by moving on top of them-",
        },
        {
        title:"Product Owner",
        imageTitle:"productOwner",
        movement:"Can move one square per turn-Can move to any direction (vertical, horizontal, or diagonal)",
        capture:"Captures other pieces by moving on top of them-",
        },
    ]
  return (
    <>
      
        <div className={styles.pieces_container}>
          <div className={styles.pieces_title}>
            <h3>The Pieces</h3>

          </div>
          {pieces.map((piece) => (
                      <div className={styles.piece_container}>
                      <div className={styles.piece_title_container}>
                        <h4>{`The ”${piece.title}”`} </h4>
                        <div className={styles.piece_images_container}>
                          <img src={`/images/${piece.imageTitle}-white.png`} alt={`${piece.title}`} className={styles.piece_image}/>
                          <img src={`/images/${piece.imageTitle}-black.png`} alt={`${piece.title}`} className={styles.piece_image}/>
                        </div>
                      </div>
          
                      <div className={styles.piece_text_container}>
                        <div className={styles.movement_container}>
          
                          <img src={`/images/${piece.imageTitle}-moves.png`} alt={`${piece.title} Movement`} className={styles.movement_image}/>
          
                          <div className={styles.movement_text}>
                            <h5>Movement</h5>
                            
                            <p>{piece.movement.split("-")[0]}</p>
                            <p>{piece.movement.split("-")[1]}</p>
                          </div>
                        </div>
                        <div className={styles.movement_container}>
                          <img src={`/images/${piece.imageTitle}-capture.png`} alt={`${piece.title} Capture`} className={styles.movement_image}/>
          
                          <div className={styles.movement_text}>
                            <h5>Capture</h5>
                            <p>{piece.capture.split("-")[0]}</p>
                            <p>{piece.capture.split("-")[1]}</p>
                          </div>
          
                        </div>
                      </div>
          
                    </div>

          ))}

        </div>
        <div>
      </div>
    </>
  );
}
