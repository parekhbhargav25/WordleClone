import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, scoreBoardDefault, keyScoreValue } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import Confetti from 'react-confetti';
import { useMediaQuery } from 'react-responsive';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [Scoreboard, setScoreBoard] = useState(scoreBoardDefault);
  const [keyScore, setKeyScore] = useState(keyScoreValue);
  const [confetti, SetConfetti] = useState(false);
  const [score, setScore] = useState([]);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });


  const setKeyScoreValue = (score, currentWord) => {
    const indices = [];
    const newKeyScorebord = [...keyScore]
    score.forEach((element, index) => {
      if (element === 2) {
        indices.push(currentWord[index] + 2);
      }
      else if (element === 1) {
        indices.push(currentWord[index] + 1);
      }
      else {
        indices.push(currentWord[index] + 0);
      }
      console.log(currAttempt.attempt)
      newKeyScorebord[currAttempt.attempt] = indices;
      setKeyScore(newKeyScorebord)
});
  }


  const onEnter = () => {
    if (currAttempt.letter !== 5) {
      alert("Not enough letters")
      return;
    }
  
    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.attempt][i];
    }
    
    // Call the API
    fetch('https://wordle-apis.vercel.app/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guess: currentWord })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the API response
      // calculate total score
      const totalScore = data.score.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      //set array of received score to a state var
      setScore(data.score);
  
      
      /* if guessed word is valid, increment user attemp, write to scoreBoard array matrix
         if not valid, alert the user and do nothing*/ 
      if (data.is_valid_word) {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
        const newScorebord = [...Scoreboard]
        newScorebord[currAttempt.attempt] = data.score;
        setScoreBoard(newScorebord)
        console.log(Scoreboard)
        setKeyScoreValue(data.score, currentWord)
      } else {
        alert("Not a valid word");
      }

      /** if user guessed correct word
       * then it's game over with Confetti on the page
      */
      if (totalScore === 10) {
        setGameOver({ gameOver: true, guessedWord: true });
        SetConfetti(true)
      }
      /** if user did not guessed correct word and have used all attempts
       * it's game over. 
      */
      if (totalScore !== 10 && currAttempt.attempt === 5) {
        setGameOver({ gameOver: true, guessedWord: false });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };


/** allow user to delete letter from word from specific row(attemp number)
 * also update the wordBoard
*/
  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };


  /**this method ebing called everytime user types a word
   * this method writes to the boardDefault array matrix
   */
  const onSelectLetter = (key) => {
    //if letter index is greater than 4, do nothing and do not write to the matrix
    if (currAttempt.letter > 4) return;

    /** create a new board from the existing board with new value or previous values
     * basically, create shallow copy of board
     */
    const newBoard = [...board];

    /** add letter to a row user typing into */
    newBoard[currAttempt.attempt][currAttempt.letter] = key;

    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          score,
          Scoreboard,
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          gameOver,
          keyScore
        }}
      >
        <div className="game">
          <Confetti run= {confetti} numberOfPieces = "200" />
          <Board score={score}/>
          {gameOver.gameOver ? <GameOver /> : isMobile || isTablet ? <Keyboard /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;