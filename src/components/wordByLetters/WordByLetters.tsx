import React, { FC, useEffect, useState } from 'react'
import { shuffleWord } from '../../utils/shuffleWord'
import './WordByLetters.scss'

interface wordByLettersProps {
    word: string
    check: boolean
}
interface Cell {
    status: string
    inner: string | null

}

const WordByLetters: FC<wordByLettersProps> = ({ word, check }) => {

    const [wordLetters, setWordLetters] = useState(shuffleWord(word.split('')))
    const [cells, setCells] = useState<Array<Cell>>(Array(wordLetters.length).fill({ status: 'default', inner: null }))

    useEffect(() => {
        if (check) {
            checkAnswer()
        } else {
            restart()
        }
    }, [check])


    const pickLetter = (letter: string, ind: number) => {
        let firstEmptyCellIndex = cells.map(e => e.inner).indexOf(null)
        setCells(cells.map((c, index) => index === firstEmptyCellIndex ? { inner: letter, status: 'default' } : c))
        let filteredLetters = wordLetters.filter((letter, index) => index !== ind)
        setWordLetters(filteredLetters)
    }

    const pickCell = (ind: number) => {

        let asd = cells.find((el, index) => index === ind)
        if (asd?.inner) {
            setWordLetters([...wordLetters, asd.inner])
        }
        setCells(cells.map((c, index) => index === ind ? { inner: null, status: 'default' } : c))
    }

    const checkAnswer = () => {
        let answer = word.split('')
        setCells(cells.map((c, index) => {
            if (c.inner !== answer[index]) {
                c.status = 'error'
                return c
            }
            c.status = 'succes'
            return c
        }))
    }

    const restart = () => {
        setWordLetters(shuffleWord(word.split('')))
        setCells(cells.map((c, index) => {
            return { inner: null, status: 'default' }
        }))
    }

    return (
        <div className='word__container'>
            <div className="word__letters letters-word">
                {wordLetters.map((letter, index) => <div onClick={() => pickLetter(letter, index)} className='letters-word__item' key={index}>{letter} </div>)}
            </div>
            <div className="word__cells cells-word">
                {cells.map((cell, index) => <div key={index} onClick={() => pickCell(index)} className={cell.status + ' cells-word__item'}>{cell.inner}</div>)}
            </div>
        </div>
    )
}

export default WordByLetters
