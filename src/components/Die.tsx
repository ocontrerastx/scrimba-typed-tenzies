import "./Die.css"

type DieProps = {
    value: number;
    isHeld: boolean;
    setHold: (id: string) => void;
    id: string;
}

export default function Die({ value, isHeld, setHold, id }: DieProps) {
    return (
        <button 
            className={`die ${isHeld ? "is-held" : ""}`}
            onClick={() => setHold(id)}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value}`}
        >
            {value}
        </button>
    )
}