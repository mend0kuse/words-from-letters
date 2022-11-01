import React, { FC, useState } from 'react'
import WordByLetters from '../wordByLetters/WordByLetters'
import './WordsList.scss'

interface WordsListProps {
	words: string[]
}

const WordsList: FC<WordsListProps> = ({ words }) => {
	const [checked, setChecked] = useState(false)
	return (
		<div className='words-list__container'>
			{words.map((word, index) => {
				return <WordByLetters word={word} key={index} check={checked} />
			})}
			<button onClick={() => setChecked(!checked)} >{checked ? 'Обновить' : 'Проверить'}</button>
		</div>
	)
}

export default WordsList