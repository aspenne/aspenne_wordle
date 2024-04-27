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

    const handleKeyDown = (event: KeyboardEvent) => {
        setErrorMessage(""); // Clear any previous error messages
        if (event.key === "Enter") {
            if (actualWord.length === 5) {
                setIsSubmitted(true); // Marquer comme soumis
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

    const checkWord = () => {
        setWords((prev) => {
            const newWords = [...prev];
            newWords[tries] = actualWord;
            return newWords;
        });

        setLettersUsed((prev) => {
            const uniqueLetters = new Set([...prev, ...actualWord.split("")]);
            return Array.from(uniqueLetters);
        });

        const correct: string[] = [];
        const nearly: string[] = [];

        actualWord.split("").forEach((letter, index) => {
            if (wordToGuess.includes(letter)) {
                if (wordToGuess[index] === letter) {
                    correct.push(letter);
                } else {
                    nearly.push(letter);
                }
            }
        });

        setCorrectLetters(correct);
        setNearlyCorrectLetters(nearly);

        if (actualWord === wordToGuess) {
            alert(`You won! It took you ${tries + 1} tries.`);
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
                <p className="bg-red-500 p-4 border-2 text-white transition ease-in-out" >{errorMessage}</p>
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
            />

        </div>
    );
};
