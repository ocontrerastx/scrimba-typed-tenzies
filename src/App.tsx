import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  type Die = {
    value: number;
    isHeld: boolean;
    id: string;
  }

  const [dice, setDice] = useState<Die[]>(() => generateAllNewDice());
  const buttonRef = useRef<HTMLButtonElement>(null);


  const gameWon: boolean =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current?.focus();
    }
  }, [gameWon]);

  function generateAllNewDice(): Die[] {
    return Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice(): void {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      })
    );
  }

  function newGame(): void {
    setDice(generateAllNewDice());
  }

  function hold(id: string): void {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      setHold={hold}
      id={die.id}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1>Tenzies</h1>
      <p className="game-instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="grid-container">{diceElements}</div>
      <button
        ref={buttonRef}
        onClick={gameWon ? newGame : rollDice}
        className="roll-button"
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;