import React, { useContext } from "react";
import { AppContext } from "../App";
import Button from '@mui/material/Button';

const GameOver = () => {
  const { currAttempt, gameOver,} = useContext(AppContext);
  // console.log(gameOver)

  //reload page so everthing is reset after user ckicks Play Again button
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      <Button size="large" onClick={handleClick} color="secondary" variant="contained">Play Again</Button>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default GameOver;