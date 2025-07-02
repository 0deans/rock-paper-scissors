import { useEffect, useState } from 'react'
import RulesModal from './components/RulesModal'
import './App.css'

const choices = ['rock', 'paper', 'scissors'] as const
type Choice = (typeof choices)[number] | null
type Result = 'win' | 'lose' | 'draw' | null

const winSound = new Audio('/sounds/win.wav')
const loseSound = new Audio('/sounds/lose.wav')
const drawSound = new Audio('/sounds/draw.wav')

function App() {
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [userChoice, setUserChoice] = useState<Choice>(null)
  const [computerChoice, setComputerChoice] = useState<Choice>(null)
  const [result, setResult] = useState<Result>(null)

  useEffect(() => {
    if (!userChoice) return

    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choices.length)
      const computerChoice = choices[randomIndex]

      determineWinner(userChoice, computerChoice)
      setComputerChoice(computerChoice)
    }, 1000)

    return () => clearTimeout(timer)
  }, [userChoice])

  const determineWinner = (user: Choice, computer: Choice) => {
    if (user === computer) {
      setResult('draw')
      drawSound.play()
      return
    }

    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      setResult('win')
      setUserScore((prevScore) => prevScore + 1)
      winSound.play()
      return
    }

    setResult('lose')
    setComputerScore((prevScore) => prevScore + 1)
    loseSound.play()
  }

  const handleUserChoice = (choice: Choice) => {
    setUserChoice(choice)
  }

  const handlePlayAgain = () => {
    setUserChoice(null)
    setComputerChoice(null)
    setResult(null)
  }

  return (
    <div className="wrapper">
      <header className="header">
        <a className="logo" href="/">
          <img src="/favicon.svg" alt="logo" />
          <div className="title">
            <span>ROCK</span>
            <span>PAPER</span>
            <span>SCISSORS</span>
          </div>
        </a>

        <RulesModal />
      </header>

      <div className="scoreboard">
        <div className="score user-score">
          <h3>You</h3>
          <p>{userScore}</p>
        </div>
        <div className="score-separator" />
        <div className="score computer-score">
          <h3>Computer</h3>
          <p>{computerScore}</p>
        </div>
      </div>

      <main className="game-area">
        {!userChoice && (
          <div className="choice-selection">
            <p>Pick your choice</p>
            <div className="choices-buttons">
              {choices.map((choice) => (
                <button
                  key={choice}
                  className="choice-btn"
                  onClick={() => handleUserChoice(choice)}
                  aria-label={`Choose ${choice}`}
                >
                  <img src={`/images/${choice}.svg`} alt={choice} />
                  <span>{choice.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {userChoice && !computerChoice && (
          <div className="waiting">
            <p>Waiting for computer...</p>
            <div className="spinner" />
          </div>
        )}

        {result && userChoice && computerChoice && (
          <div className="result">
            <h2>{result === 'draw' ? 'Draw' : `You ${result}`}</h2>
            <div className="choices">
              <div className="user-choice">
                <p>
                  You picked <strong>{userChoice.toUpperCase()}</strong>
                </p>
                <img src={`/images/${userChoice}.svg`} alt={userChoice} />
              </div>
              <div className="computer-choice">
                <p>
                  Computer picked{' '}
                  <strong>{computerChoice.toUpperCase()}</strong>
                </p>
                <img
                  src={`/images/${computerChoice}.svg`}
                  alt={computerChoice}
                />
              </div>
            </div>
            <button className="play-again-btn" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        @ {new Date().getFullYear()} 0dean. All rights reserved.
      </footer>
    </div>
  )
}

export default App
