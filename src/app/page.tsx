'use client'
import {useEffect, useState} from "react";
import Rows from "@/components/row";
import Keyboard from "@/components/Keyboard";
import {MOTS} from "@/config/words";


export default function App() {



    const [actualWord, setActualWord] = useState<string>("");
    const [words, setWords] = useState<string[]>([]);
    const [tries, setTries] = useState<number>(0)
    const [wordToGuess, setWordToGuess] = useState<string>(MOTS[Math.floor(Math.random() * MOTS.length)]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [lettersUsed, setLettersUsed] = useState<string[]>([]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, );

    useEffect(() => {
        words[tries] = actualWord;
    }, [actualWord]);

    useEffect(() => {
        const uniqueLetters = new Set(lettersUsed);
        words.forEach((word) => {
            word.split("").forEach((letter) => {
                uniqueLetters.add(letter);
            });
        });
        setLettersUsed(Array.from(uniqueLetters));
        console.log(lettersUsed);
    }, [words]);

    useEffect(() => {
        const newWords = [...words];
        newWords[tries] = actualWord;
        setWords(newWords);
    }, [actualWord, tries]);

    const wordIsValid = (word: string) => {
        console.log(word, wordToGuess);
        if (word === wordToGuess) {
            alert("You won!");
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key ) {
            case "Enter":
                if (actualWord.length === 5) {
                    setTries(tries + 1);
                    setIsSubmitted(true);
                    wordIsValid(actualWord);
                    setActualWord("");
                } else {
                    alert("Word must be 5 characters long");
                }
                break;
            case "Backspace":
                if (actualWord.length > 0) {
                    setActualWord(actualWord.slice(0, -1));
                }
                break;
            default:
                if (actualWord.length < 5) {
                    const newActualWord = actualWord + event.key;
                    setActualWord(newActualWord);
                }
                break;
        }
    }

    return (
        <div
            className="
                flex flex-col gap-8 justify-center items-center
                p-10
                bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400
                text-white"
        >
            <h1 className="text-5xl font-bold text-">Aspenne Wordle Game</h1>
            <Rows
                words={words}
                wordToGuess={wordToGuess}
                tries={tries}
                isSubmitted={isSubmitted}
            />
            <Keyboard lettersUsed={lettersUsed}/>
        </div>
    );
}
