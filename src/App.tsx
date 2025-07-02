import { useEffect, useState } from 'react'
import ChoiceSelection from './components/ChoiceSelection'
import Header from './components/Header'
import ResultDisplay from './components/ResultDisplay'
import ScoreBoard from './components/Scoreboard'
import { choicesArray, SOUNDS } from './constants/game'
import type { Choice, GameResult } from './constants/game'
import './App.css'

function App() {
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [userChoice, setUserChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)

  useEffect(() => {
    if (!userChoice) return

    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choicesArray.length)
      const computerChoice = choicesArray[randomIndex]

      determineWinner(userChoice, computerChoice)
      setComputerChoice(computerChoice)
    }, 1000)

    return () => clearTimeout(timer)
  }, [userChoice])

  const determineWinner = (user: Choice, computer: Choice) => {
    if (user === computer) {
      setResult('draw')
      SOUNDS.draw.play()
      return
    }

    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      setResult('win')
      setUserScore((prevScore) => prevScore + 1)
      SOUNDS.win.play()
      return
    }

    setResult('lose')
    setComputerScore((prevScore) => prevScore + 1)
    SOUNDS.lose.play()
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
      <Header />
      <ScoreBoard userScore={userScore} computerScore={computerScore} />

      <main className="game-area">
        {!userChoice && <ChoiceSelection onChoice={handleUserChoice} />}

        {userChoice && !computerChoice && (
          <div className="waiting">
            <p>Waiting for computer...</p>
            <div className="spinner" />
          </div>
        )}

        {result && userChoice && computerChoice && (
          <ResultDisplay
            result={result}
            userChoice={userChoice}
            computerChoice={computerChoice}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>

      <footer className="footer">
        @ {new Date().getFullYear()} 0dean. All rights reserved.
      </footer>
    </div>
  )
}

export default App
