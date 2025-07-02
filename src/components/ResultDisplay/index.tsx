import { CHOICES } from '@/constants/game'
import styles from './ResultDisplay.module.css'
import type { Choice, GameResult } from '@/constants/game'

interface ResultDisplayProps {
  result: GameResult
  userChoice: Choice
  computerChoice: Choice
  onPlayAgain: () => void
}

const ResultDisplay = ({
  result,
  userChoice,
  computerChoice,
  onPlayAgain
}: ResultDisplayProps) => {
  const resultText = result === 'draw' ? 'Draw' : `You ${result}`
  const userChoiceData = CHOICES[userChoice]
  const computerChoiceData = CHOICES[computerChoice]

  return (
    <div className={styles.result}>
      <h2>{resultText}</h2>
      <div className={styles.choices}>
        <div className={styles.userChoice}>
          <p>
            You picked <strong>{userChoiceData.name}</strong>
          </p>
          <img src={userChoiceData.image} alt={userChoiceData.name} />
        </div>
        <div className={styles.computerChoice}>
          <p>
            Computer picked <strong>{computerChoiceData.name.toUpperCase()}</strong>
          </p>
          <img src={computerChoiceData.image} alt={computerChoiceData.name} />
        </div>
      </div>
      <button className={styles.playAgainBtn} onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}

export default ResultDisplay
