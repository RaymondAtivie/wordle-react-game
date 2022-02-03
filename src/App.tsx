import React, { ReactElement, useEffect, useState } from 'react'
import Board from './components/Board'
import Keyboard from './components/Keyboard'

function App(): ReactElement {
	const [gameMessage, setGameMessage] = useState('')
	const [attempt, setAttempts] = useState(1 as number)
	const [gameBox, setGamebox] = useState([[]] as string[][])

	const correctWord = ['M', 'O', 'I', 'S', 'T']
	const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const maxWords = 7
	const guessLimit = 4

	useEffect(() => {
		console.log('rinning setup')
		const ats = []
		for (let i = 0; i < guessLimit; i++) {
			ats.push([])
		}

		setGamebox(ats)
	}, [setGamebox, guessLimit])

	const addToGameBox = (letter: string, attempt: number) => {
		const currentAttempt = gameBox[attempt - 1]
		if (currentAttempt.length < maxWords) {
			currentAttempt.push(letter)
			setGamebox([...gameBox])
		}
	}
	const removeFromGameBox = (attempt: number) => {
		const currentAttempt = gameBox[attempt - 1]
		if (currentAttempt.length > 0) {
			currentAttempt.pop()
			setGamebox([...gameBox])
		}
	}
	const submitAttempt = () => {
		const currentAttempt = gameBox[attempt - 1]
		if (currentAttempt.length < maxWords) {
			setGameMessage('not enough words')
			return
		}
		if (attempt >= guessLimit) {
			setGameMessage('game over')
			return
		}
		setAttempts(attempt + 1)
	}

	const keyClick = (letter: string): void => {
		addToGameBox(letter, attempt)
		setGameMessage('')
	}

	const deleteClick = (): void => {
		console.log('Delete it')
		removeFromGameBox(attempt)
	}

	useEffect(() => {
		function handle(ev: KeyboardEvent) {
			if (ev.key === 'Backspace') {
				deleteClick()
			} else if (allLetters.includes(ev.key.toUpperCase())) {
				keyClick(ev.key.toUpperCase())
			} else if (ev.key === 'Enter') {
				submitAttempt()
			}
		}

		document.addEventListener('keydown', handle)

		return () => document.removeEventListener('keydown', handle)
	})

	const correctkeys = gameBox
		.filter((attemptRow, ix) => {
			return ix + 1 < attempt
		})
		.flat()
		.filter((letter) => correctWord.includes(letter))

	return (
		<div className="flex flex-col items-center justify-around h-full space-y-4">
			<div className="h-6">{gameMessage}</div>

			<Board gameBox={gameBox} maxWords={maxWords} currentAttempt={attempt} correctWord={correctWord} />

			<Keyboard
				gameBox={gameBox}
				correctWord={correctkeys}
				onClick={keyClick}
				onDelete={deleteClick}
				onEnter={submitAttempt}
			/>
		</div>
	)
}

export default App
