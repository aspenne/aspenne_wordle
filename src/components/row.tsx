import {useState} from "react";

interface RowsProps {
    words: string[];
    wordToGuess: string;
    tries: number;
    isSubmitted: boolean;
}
export default function Rows(props: RowsProps) {
    const numberOfColumns: number = 6;
    const numberOfRows: number = 5;

    const [correctLetters, setCorrectLetters] = useState<string[]>([])
    const [nearlyCorrectLetters, setNearlyCorrectLetters] = useState<string[]>([])
    const getBackgroundColor = (letter: string, row: number, column: number): string => {
        if (!props.isSubmitted || row >= props.tries) {
            return "bg-gray-950";
        }
        if (props.wordToGuess[column] === letter.toLowerCase()) {
            return "bg-gradient-to-br from-green-500 to-green-200";
        } else if (props.wordToGuess.includes(letter.toLowerCase())) {
            return "bg-gradient-to-br from-yellow-500 to-yellow-200";
        } else {
            return "bg-gradient-to-br from-gray-500 to-gray-400";
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {Array.from({length: numberOfColumns}).map((i, row) => (
                <div key={row} className="flex flex-row gap-4" id={`row-${row.toString()}`}>
                    {Array.from({length: numberOfRows}).map((_, column) => {
                        const letter = props.words[row]?.[column]?.toLocaleUpperCase() ?? "";
                        return (
                            <div
                                className={`
                                    mx-2 p-6 
                                    border-2 rounded-lg 
                                    text-white font-bold text-xl 
                                    bg-gradient-to-br from-gray-500 to-gray-400
                                    ${getBackgroundColor(letter, row, column)}`}
                                key={column}
                                id={`column-${column.toString()}`}
                            >
                                {letter}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
