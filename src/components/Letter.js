import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

//component for each letter box, will be called in Board to create the Wordle Board
const Letter = ({ letterPos, attemptVal }) => {
  const {Scoreboard,board, setDisabledLetters, currAttempt } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const scoreVal = Scoreboard[attemptVal][letterPos];
  const correct = scoreVal === 2;
  const almost = scoreVal === 1;
  //this letter state wil be used to add ID to Div and than apply color style
  // 0 --> error
  // 1--> almost
  // 2--> 2 correct
  const letterState =currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

  //call useEffect hook every time we change currAttempt.attempt
  useEffect(() => {
    if (letter !== "") {
    //   console.log(letter);
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;