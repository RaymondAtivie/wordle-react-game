import { ReactElement } from 'react'

interface KeyboardProps {
	onClick?: (letter: string) => void
	onDelete?: () => void
	onEnter?: () => void
	gameBox: string[][]
	correctWord: string[]
}

const Keyboard = (props: KeyboardProps): ReactElement => {
	const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const letterBoxes = allLetters
		.split('')
		.map((letter) => {
			return {
				text: letter,
				correct: props.correctWord.includes(letter)
			}
		})
		.map((key) => {
			return (
				<button
					onClick={() => props.onClick && props.onClick(key.text)}
					key={key.text}
					className={
						'flex items-center justify-center w-12 h-16 font-bold bg-gray-200 border rounded-lg ' +
						(key.correct ? 'bg-emerald-500 border-emerald-500 text-white' : '')
					}
				>
					{key.text}
				</button>
			)
		})

	return (
		<div className="grid grid-cols-8 gap-2">
			{letterBoxes}

			<button
				onClick={props.onEnter}
				className="flex items-center justify-center h-16 col-span-2 font-bold bg-gray-200 border rounded-lg"
			>
				ENTER
			</button>
			<button
				onClick={props.onDelete}
				className="flex items-center justify-center h-16 col-span-2 font-bold bg-gray-200 border rounded-lg"
			>
				DELETE
			</button>
		</div>
	)
}

export default Keyboard
