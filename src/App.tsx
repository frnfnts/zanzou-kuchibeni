import { useState, useCallback } from 'react'
import './App.css'
import { useInterval } from './useInterval'

const ALPHABET = [
  "あいうえお",
  "かきくけこ",
  "さしすせそ",
  "たちつてと",
  "なにぬねの",
  "はひふへほ",
  "まみむめも",
  "やゆよ",
  "らりるれろ",
  "わをん"
]

function App() {
  const [availableLetters, setAvailableLetters] = useState(new Set(ALPHABET.join('')))
  const removeRandomLetter = useCallback(() => {
    setAvailableLetters((prev) => {
      const next = new Set(prev)
      const randomIndex = Math.floor(Math.random() * prev.size)
      let count = 0
      for (const letter of prev.values()) {
        if (count === randomIndex) {
          next.delete(letter)
          console.log('remove', letter, prev.size)
          return next
        }
        count++
      }
      return next
    })
  }, [])

  const { startInterval, stopInterval } = useInterval(removeRandomLetter, 1000)

  return (<>
    <div className="wrapper">
      {ALPHABET.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.split('').map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={[availableLetters.has(letter) ? 'available' : '', 'letter'].join(' ')}
              onClick={() => {
                setAvailableLetters((prev) => {
                  const next = new Set(prev)
                  if (next.has(letter)) {
                    next.delete(letter)
                  } else {
                    next.add(letter)
                  }
                  return next
                })
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
    <div className="controller">
      <button onClick={startInterval}>Start</button>
      <button onClick={stopInterval}>Stop</button>
    </div>
  </>)
}

export default App
