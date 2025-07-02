import paperImg from '@/assets/images/paper.svg'
import rockImg from '@/assets/images/rock.svg'
import scissorsImg from '@/assets/images/scissors.svg'
import drawSoundFile from '@/assets/sounds/draw.wav'
import loseSoundFile from '@/assets/sounds/lose.wav'
import winSoundFile from '@/assets/sounds/win.wav'

export const CHOICES = {
  rock: {
    name: 'Rock',
    image: rockImg
  },
  paper: {
    name: 'Paper',
    image: paperImg
  },
  scissors: {
    name: 'Scissors',
    image: scissorsImg
  }
} as const

export type Choice = keyof typeof CHOICES

export const choicesArray = Object.keys(CHOICES) as Choice[]

export type GameResult = 'win' | 'lose' | 'draw'

export const SOUNDS = {
  win: new Audio(winSoundFile),
  lose: new Audio(loseSoundFile),
  draw: new Audio(drawSoundFile)
}
