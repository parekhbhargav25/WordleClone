import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    keyScore,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext);

  /** this method handels keys pressed in the keyboard */
  const handleKeyboard = useCallback( (event) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [currAttempt]
  );

  //being called everytime state of handleKeyboard changes, so at every key pressed
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  /** this method extracts digit from the "keyScoreValue" matrix and passing in down to chidlren compo key
   * to apply CSS style to key bassed on the score value for each key
   */
  const extractDigit = (keyScore, key) => {
    for (let i = 0; i < keyScore.length; i++) {
        for (let j = 0; j < keyScore[i].length; j++) {
            const entry = keyScore[i][j];
            if (entry && entry.startsWith(key)) {
                return parseInt(entry.substring(1)); // Extracting the digit part
            }
        }
    }
    return null;
};


  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          const digit = extractDigit(keyScore,key);
          return <Key keyVal={key}   digit={digit} />;
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          const digit = extractDigit(keyScore,key);
          return <Key keyVal={key}  digit={digit} />;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          const digit = extractDigit(keyScore,key);
          return <Key keyVal={key}  digit={digit} />;
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;