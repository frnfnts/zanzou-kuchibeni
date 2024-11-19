import { useState, useCallback } from 'react'
import './App.css'

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
  const [disappearedLetters, setDisappearedLetters] = useState(new Set())
  return (
    <div className="wrapper">
      {ALPHABET.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.split('').map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={[disappearedLetters.has(letter) ? 'disappeared' : '', 'letter'].join(' ')}
              onClick={() => {
                setDisappearedLetters((prev) => {
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
  )
}

export default App
