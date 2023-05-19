import React, { useState, useEffect } from 'react';

const Main = () => {
  const [userChoice, setUserChoice] = useState("rock");
  const [compChoice, setCompChoice] = useState("rock");
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [result, setResult] = useState("Let's see who wins the game!");
  const [turnResult, setTurnResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const random = choices[Math.floor(Math.random() * choices.length)];
    setCompChoice(random);
  };

  const reset = () => {
    setUserChoice("rock");
    setCompChoice("rock");
    setUserScore(0);
    setCompScore(0);
    setResult("Let's see who wins the game!");
    setTurnResult(null);
    setGameOver(false);
  };

  useEffect(() => {
    const moves = userChoice + compChoice;
    if (userScore === 10 || compScore === 10) {
      setGameOver(true);
      setResult(userScore === 10 ? "You won the game!" : "Computer won the game");
    } else if (!gameOver) {
      if (moves === "rockscissors" || moves === "scissorspaper" || moves === "paperrock") {
        setUserScore(prevScore => prevScore + 1);
        setTurnResult(`You won!! as you chose ${userChoice} and computer chose ${compChoice}`);
      } else if (moves === "paperscissors" || moves === "rockpaper" || moves === "scissorsrock") {
        setCompScore(prevScore => prevScore + 1);
        setTurnResult(`You lost!! as you chose ${userChoice} and the computer chose ${compChoice}`);
      } else if (moves === "rockrock" || moves === "paperpaper" || moves === "scissorsscissors") {
        setTurnResult(`Nobody won as it was a draw !! as you chose ${userChoice} and computer chose ${compChoice}`);
      }
    }
  }, [userChoice, compChoice, userScore, compScore, gameOver]);

  return (
    <div className="main">
      <div className="score">
        <h1>User score - {userScore}</h1>
        <h1>Computer score - {compScore}</h1>
      </div>

      <div className="choice">
        <div className="user-choice">
          <img className="user-hand" src={`../images/${userChoice}.png`} width="200px" height="100px" alt={userChoice} />
        </div>
        <div className="comp-choice">
          <img className="comp-hand" src={`../images/${compChoice}.png`} width="200px" height="100px" alt={compChoice} />
        </div>
      </div>

      <div className="button-div">
        {choices.map((choice, index) => (
          <button className="button" key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
            {choice}
          </button>
        ))}
      </div>

      <div className="turn-result">
        <h1>Turn Result - {turnResult}</h1>
      </div>
      <div className="final-result">
        <h1>Final Result - {result}</h1>
      </div>

      <div className="restart-div">
        {gameOver && (
          <button className="reset" onClick={reset}>
            Restart ?
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
