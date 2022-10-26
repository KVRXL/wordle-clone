import React, { useContext } from 'react'
import { AppContext } from '../App'


export const Key = ({ keyVal, bigKey }) => {

    const { currentGuess, setCurrentGuess, guesses, setGuesses,
      gameOver, setGameOver, wordsList, solution } = useContext(AppContext)

    const handleKey = () => {
      if (gameOver) {
        return;
      }
  
      if (keyVal === 'ENTER') {
        if (currentGuess.length !== 5){
          console.log('za krotkie')
          return;
        }
        else if (currentGuess.length === 5 && !wordsList.includes(currentGuess)){
          console.log('zle slowo')
          alert('Not in a dictionary')
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex(val=>val==null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');
  
        const isCorrect = solution === currentGuess;
        if (isCorrect) {
        setGameOver(true);
        }
      }
  
      if (keyVal === 'DELETE') {
        setCurrentGuess(currentGuess.slice(0, -1))
        return;
      }
      
      if (currentGuess.length >= 5) {
        return;
      }
      setCurrentGuess(currentGuess + keyVal);
    };

  

  return (
    <div className = 'key' id={bigKey && 'big'} onClick={handleKey}>{keyVal}</div>
  )
}


