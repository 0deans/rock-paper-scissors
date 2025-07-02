import { CHOICES, choicesArray } from '@/constants/game'
import styles from './ChoiceSelection.module.css'
import type { Choice } from '@/constants/game'

interface ChoiceSelectionProps {
  onChoice: (choice: Choice) => void
}

const ChoiceSelection = ({ onChoice }: ChoiceSelectionProps) => {
  return (
    <div className={styles.choiceSelection}>
      <p>Pick your choice</p>
      <div className={styles.choicesButtons}>
        {choicesArray.map((choice) => {
          const { name, image } = CHOICES[choice]

          return (
            <button
              key={choice}
              className={styles.choiceBtn}
              onClick={() => onChoice(choice)}
              aria-label={`Choose ${choice}`}
            >
              <img src={image} alt={name} />
              <span>{choice.toUpperCase()}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ChoiceSelection
