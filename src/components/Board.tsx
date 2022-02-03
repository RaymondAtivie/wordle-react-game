import { ReactElement } from 'react'

interface BoardProps {
	gameBox: string[][]
	maxWords?: number
	correctWord: string[]
	currentAttempt: number
}

const Board = ({ gameBox, maxWords = 5, correctWord, currentAttempt }: BoardProps): ReactElement => {
	const emptyBox = (ix: string) => (
		<div
			key={ix}
			className="flex items-center justify-center w-16 h-16 text-4xl font-bold border-2 border-gray-300"
		></div>
	)

	const letterBox = (letter: string, ix: number, isPastAttempt: boolean = false) => {
		let classList = 'flex items-center justify-center w-16 h-16 text-4xl font-bold border-2 transition-all'

		if (isPastAttempt) {
			classList += ' text-white'

			if (correctWord[ix] == letter) {
				classList += ' bg-emerald-500 border-emerald-500'
			} else if (correctWord.includes(letter)) {
				classList += ' bg-yellow-400 border-yellow-400'
			} else {
				classList += ' bg-gray-400 border-gray-400'
			}
		} else {
			classList += ' border-gray-800'
		}

		return (
			<div key={ix} className={classList}>
				{letter}
			</div>
		)
	}

	const attempts = gameBox.map((attempt, ix) => {
		let emptyBoxes = [] as any[]

		if (attempt.length < maxWords) {
			for (let i = 0; i < maxWords - attempt.length; i++) {
				emptyBoxes.push(emptyBox(i + 'e'))
			}
		}

		const pastAttempt = currentAttempt - 1 > ix

		return (
			<div className="flex items-center space-x-2" key={ix}>
				{attempt.map((letter, jx) => letterBox(letter, jx, pastAttempt))}
				{emptyBoxes}
			</div>
		)
	})

	return <div className="flex flex-col space-y-2">{attempts}</div>
}

export default Board
