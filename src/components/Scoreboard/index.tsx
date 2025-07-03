import styles from './Scoreboard.module.css'

interface ScoreboardProps {
  userScore: number
  computerScore: number
}

const ScoreBoard = ({ userScore, computerScore }: ScoreboardProps) => {
  return (
    <div className={styles.scoreboard}>
      <div className={styles.score}>
        <h3>You</h3>
        <p>{userScore}</p>
      </div>
      <div className={styles.scoreSeparator} />
      <div className={styles.score}>
        <h3>Computer</h3>
        <p>{computerScore}</p>
      </div>
    </div>
  )
}

export default ScoreBoard
