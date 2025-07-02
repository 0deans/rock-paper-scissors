import { useEffect, useState } from 'react'
import RulesModal from './components/RulesModal'
import './App.css'

const choices = ['rock', 'paper', 'scissors'] as const
type Choice = (typeof choices)[number] | null
type Result = 'win' | 'lose' | 'draw' | null

const loseSound = new Audio('/sounds/lose.wav')

function App() {
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [userChoice, setUserChoice] = useState<Choice>(null)
  const [computerChoice, setComputerChoice] = useState<Choice>(null)
  const [result, setResult] = useState<Result>('lose')

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
      return
    }

    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      setResult('win')
      setUserScore((prevScore) => prevScore + 1)
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

      <main className="game-area">
        {result && (
          <div className="result">
            <h2>{result === 'draw' ? 'Draw' : `You ${result}`}</h2>
            <div className="choices">
              <div className="user-choice">
                <h3>Your Choice</h3>
                <img
                  src={`/images/${userChoice}.png`}
                  alt={userChoice || 'No choice'}
                />
              </div>
              <div className="computer-choice">
                <h3>Computer's Choice</h3>
                <img
                  src={`/images/${computerChoice}.png`}
                  alt={computerChoice || 'No choice'}
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
