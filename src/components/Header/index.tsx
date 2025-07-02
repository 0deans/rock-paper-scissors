import RulesModal from '../RulesModal'
import styles from './Header.module.css'
import logo from '/favicon.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <img src={logo} alt="logo" />
        <div className={styles.title}>
          <span>ROCK</span>
          <span>PAPER</span>
          <span>SCISSORS</span>
        </div>
      </a>

      <RulesModal />
    </header>
  )
}

export default Header
