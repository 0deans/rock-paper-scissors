import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './RulesModal.css'

const RulesModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const handleTransitionEnd = () => {
    if (!isVisible) setIsOpen(false)
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (isVisible && closeBtnRef.current) {
      closeBtnRef.current.focus()
    }
  }, [isVisible])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeModal()
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button className="rules-button" onClick={() => setIsOpen(true)}>
        Rules
      </button>
      {isOpen &&
        createPortal(
          <div
            className={`rules-modal ${isVisible ? 'enter' : 'exit'}`}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="rules-modal-overlay" />
            <div className="rules-modal-content" ref={modalRef}>
              <h2>Game Rules</h2>
              <ul>
                <li>Rock beats Scissors</li>
                <li>Scissors beats Paper</li>
                <li>Paper beats Rock</li>
              </ul>
              <button onClick={closeModal} ref={closeBtnRef}>
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default RulesModal
