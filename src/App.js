import { useEffect, useState, createContext } from 'react';
import './App.css';
import Line from './components/Line';
import {Keyboard} from './components/Keyboard';

export const AppContext = createContext();

const API_URL = 'https://my-wordle-api-clone.herokuapp.com'

function App() {
const [solution, setSolution] = useState('');
const [guesses, setGuesses] = useState (Array(6).fill(null));
const [currentGuess, setCurrentGuess] = useState ('');
const [gameOver, setGameOver] = useState(false)
const [wordsList, setWordsList] = useState([])

useEffect(() => {
  const handleTyping = (event) => {
    if (gameOver) {
      return;
    }

    if (event.key === 'Enter') {
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

    if (event.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1))
      return;
    }
    
    if (currentGuess.length >= 5) {
      return;
    }

    const isLetter = event.keyCode >= 65 && event.keyCode <= 90
      if (isLetter) {
        setCurrentGuess(oldGuess => oldGuess + event.key.toUpperCase());
      }

    };


  window.addEventListener('keydown', handleTyping);

  return () => window.removeEventListener('keydown', handleTyping)
  
}, [currentGuess, gameOver, solution, guesses, wordsList]);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      setWordsList(words)
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setSolution(randomWord)
    }

    fetchWord();
  }, []);

  return (
    <div>
    <div className ='name'>Wordle</div>
        <AppContext.Provider
        value={{
          currentGuess,
          setCurrentGuess,
          guesses,
          setGuesses,
          gameOver, 
          setGameOver,
          wordsList, 
          setWordsList,
          solution,
          setSolution
        }}
        >
    <div className='board'>
      {guesses.map(( guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(val => val == null);
        return (
          <Line 
            guess={isCurrentGuess ? currentGuess : guess ?? ''} 
            isFinal={!isCurrentGuess && guess != null}
            solution={solution}/>
        ) 
      })
      }
    </div>
    <div className = 'keyboard'>
      <Keyboard  />
    </div>
    </AppContext.Provider>
    </div>
  )
}

export default App
