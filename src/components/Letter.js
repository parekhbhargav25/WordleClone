import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

//component for each letter box, will be called in Board to create the Wordle Board
const Letter = ({ letterPos, attemptVal }) => {
  const {Scoreboard,board, currAttempt } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const scoreVal = Scoreboard[attemptVal][letterPos];
  const correct = scoreVal === 2;
  const almost = scoreVal === 1;
  //this letter state wil be used to add ID to Div and than apply color style
  // 0 --> wrong
  // 1--> almost
  // 2--> 2 correct
  const letterState =currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "wrong");

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;