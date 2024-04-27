'use client';
import Rows from "@/components/row";
import Keyboard from "@/components/Keyboard";
import {MOTS} from "@/config/words";
import {useEffect, useState} from "react";

export default function App() {
    const [actualWord, setActualWord] = useState("");
    const [words, setWords] = useState<string[]>([]);
    const [tries, setTries] = useState(0);
    const [wordToGuess, setWordToGuess] = useState(MOTS[Math.floor(Math.random() * MOTS.length)]);
    const [lettersUsed, setLettersUsed] = useState<string[]>([]);
    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [nearlyCorrectLetters, setNearlyCorrectLetters] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleKeyDown = (event: KeyboardEvent) => {
        setErrorMessage("");
        if (event.key === "Enter") {
            if (actualWord.length === 5) {
                setIsSubmitted(true);
                checkWord();
            } else {
                setErrorMessage("Word must be 5 characters long.");
            }
        } else if (event.key === "Backspace") {
            setActualWord((prev) => prev.slice(0, -1));
        } else if (actualWord.length < 5) {
            const isLetter = /^[a-zA-Z]$/.test(event.key);
            if (isLetter) {
                setActualWord((prev) => prev + event.key);
            } else {
                setErrorMessage("Only letters are allowed");
            }
        }
    };

    const handleLetterClick = (letter: string) => {
        handleKeyDown({key: letter} as KeyboardEvent);
    }

    const checkWord = () => {
        setWords((prev) => {
            const newWords = [...prev];
            newWords[tries] = actualWord;
            return newWords;
        });

        setLettersUsed((prev) => {
            const uniqueLetters = new Set([...prev, ...actualWord.toLowerCase().split("")]);
            return Array.from(uniqueLetters);
        });

        const correct: string[] = correctLetters ||  [];
        const nearly: string[] = nearlyCorrectLetters || [];

        actualWord.split("").forEach((letter:string, index) => {
            if (wordToGuess.includes(letter.toLowerCase())) {
                if (wordToGuess[index] === letter.toLowerCase()) {
                    correct.push(letter.toLowerCase());
                } else {
                    nearly.push(letter.toLowerCase());
                }
            }
        });

        setCorrectLetters(correct);
        setNearlyCorrectLetters(nearly);

        console.log(wordToGuess)

        if (actualWord.toLowerCase() === wordToGuess) {
            alert(`You won! It took you ${tries + 1} tries.`);
            setSuccessMessage(`You won ! It took you ${tries + 1} tries.`);
        }

        setTries((prev) => prev + 1);
        setActualWord("");
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        setWords((prev) => {
            const newWords = [...prev];
            newWords[tries] = actualWord;
            return newWords;
        });
    }, [actualWord]);

    return (
        <div
            className="
            flex flex-col gap-8 justify-center items-center
            p-10
            bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400
            text-white"
        >
            <h1 className="text-4xl font-bold text-center">Aspenne wordle game</h1>

            {errorMessage &&
                <p className="bg-red-500 p-4 border-2 text-white" >{errorMessage}</p>
            }

            {successMessage &&
                <p className="bg-green-500 p-4 border-2 text-white" >{successMessage}</p>
            }

            <Rows
                words={words}
                wordToGuess={wordToGuess}
                tries={tries}
                isSubmitted={isSubmitted}
            />

            <Keyboard
                lettersUsed={lettersUsed}
                nearlyCorrectLetters={nearlyCorrectLetters}
                correctLetters={correctLetters}
                onLetterClick={handleLetterClick}
            />

        </div>
    );
};
