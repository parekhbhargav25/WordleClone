import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled }) => {
  const { gameOver,Scoreboard, currAttempt, onSelectLetter, onDelete,onEnter,disabledLetters } = useContext(AppContext);
    const uniqueArray = [...new Set(disabledLetters)];
    console.log(Scoreboard[currAttempt])

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && `disabled`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;