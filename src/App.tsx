import { useState, useCallback, useMemo } from 'react'
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
  const [time, setTime] = useState(0)

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

  const { startInterval, stopInterval } = useInterval(removeRandomLetter, 60 * 1000)
  const { startInterval: startTimer, stopInterval: stopTimer } = useInterval(() => {
    setTime((prev) => prev + 1)
  }, 1000)

  const start = useCallback(() => {
    startInterval()
    startTimer()
  }, [startInterval, startTimer])

  const stop = useCallback(() => {
    stopInterval()
    stopTimer()
  }, [stopInterval, stopTimer])

  const reset = useCallback(() => {
    setAvailableLetters(new Set(ALPHABET.join('')))
    stop()
    setTime(0)
  }, [setAvailableLetters, stop])

  const timeString = useMemo(() => (
    `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
  ), [time])

  return (<>
    <div className="timer">
      {timeString}
    </div>
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
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  </>)
}

export default App
