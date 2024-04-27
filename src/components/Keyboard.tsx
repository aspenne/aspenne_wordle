import {LETTERS} from "@/config/letters";

interface KeyboardProps {
    lettersUsed: string[];
    correctLetters: string[];
    nearlyCorrectLetters: string[];
}

export default function Rows(props: KeyboardProps) {
    function LetterRow({ letters, lettersUsed }: { letters: string[], lettersUsed: string[] }) {
        const getBackgroundColor = (letter: string): string => {
            if  (props.correctLetters?.includes(letter.toLowerCase())) {
                return "bg-gradient-to-br from-green-500 to-green-200";
            }
            else if (props.nearlyCorrectLetters?.includes(letter.toLowerCase())) {
                return "bg-gradient-to-br from-yellow-500 to-yellow-200";
            }
            return lettersUsed.includes(letter.toLowerCase()) ? "bg-gradient-to-br from-gray-500 to-gray-400" : "bg-transparent";
        };

        return (
            <div className="
                flex flex-row gap-2 flex-wrap justify-center items-center
                mt-0.5 max-w-xl">
                {letters.map((letter, index) => (
                    <div
                        className={`p-3 border-2 rounded-lg text-white font-bold text-xl ${getBackgroundColor(letter)}`}
                        key={index}
                    >
                        {letter}
                    </div>
                ))}
            </div>
        );
    }

    return (
            <div className="flex flex-col gap-4 justify-center items-center text-white">
                <LetterRow letters={LETTERS} lettersUsed={props.lettersUsed} />
            </div>
    );
}
