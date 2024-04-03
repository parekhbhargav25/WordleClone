import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, digit }) => {
  const {gameOver, onSelectLetter, onDelete,onEnter } = useContext(AppContext);
  
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
      id={bigKey ? "big" : `changeCol${digit}`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;