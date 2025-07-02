import { useEffect, useState } from 'react'
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
        <h1>Rock Paper Scissors</h1>

        <div className="scoreboard">
          <div className="scoreboard-item">
            <span>YOU</span>
            <span>{userScore}</span>
          </div>
          <div className="scoreboard-item scoreboard-enemy">
            <span>COMPUTER</span>
            <span>{computerScore}</span>
          </div>
        </div>
      </header>

      <main className="game-area">test</main>

      <footer className="footer">
        @ {new Date().getFullYear()} 0dean. All rights reserved.
      </footer>
    </div>
  )
}

export default App
