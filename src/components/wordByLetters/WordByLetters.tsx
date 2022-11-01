import React, { FC, useState } from 'react'
import './WordByLetters.scss'

interface wordByLettersProps {
    word: string
}


const WordByLetters: FC<wordByLettersProps> = ({ word }) => {
    function shuffle(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const [wordLetters, setWordLetters] = useState(shuffle(word.split('')))
    const [cells, setCells] = useState<Array<string | null>>(word.split('').map(i => null))

    const [end, setEnd] = useState(false)
    const [perfect, setPerfect] = useState(true)

    const pickLetter = (letter: string, ind: number) => {
        let lastCellIndex = cells.indexOf(null)
        setCells(cells.map((c, index) => index === lastCellIndex ? letter : c))
        let asd = wordLetters.filter((letter, index) => index !== ind)
        setWordLetters(asd)
    }

    const pickCell = (ind: number) => {
        setPerfect(true)
        setEnd(false)
        let asd = cells.find((el, index) => index === ind)
        if (asd) {
            setWordLetters([...wordLetters, asd])
        }
        setCells(cells.map((c, index) => index === ind ? null : c))
    }

    const checkAnswer = () => {
        let answer = word.split('')
        cells.forEach((el, index) => {
            if (el !== answer[index]) {
                setPerfect(false)
            }
        })
        setEnd(true)
    }

    return (
        <div className='word__container'>
            <div className="word__letters letters-word">
                {wordLetters.map((letter, index) => <div onClick={() => pickLetter(letter, index)} className='letters-word__item' key={index}>{letter} </div>)}
            </div>
            <div className="word__cells cells-word">
                {cells.map((cell, index) => <div key={index} onClick={() => pickCell(index)} className='cells-word__item'>{cell}</div>)}
            </div>
            <button onClick={checkAnswer}>проверить</button>
            {end && <p>{perfect == true ? 'Всё правильно' : 'Есть ошибки'}</p>}
        </div>
    )
}

export default WordByLetters
