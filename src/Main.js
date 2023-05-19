import React, { useState, useEffect } from 'react';

const Main = () => {
  const [userchoice, setUserchoice] = useState("rock");
  const [compchoice, setCompchoice] = useState("rock");
  const [userscore, setUserscore] = useState(1);
  const [compscore, setCompscore] = useState(1);
  const [result, setResult] = useState("Let's see who wins the game!");
  const [turnresult, setTurnresult] = useState(null);
  const [gameover, setGameover] = useState(false);
  const [totalMatches, setTotalMatches] = useState(10);

  const choices = ["rock", "paper", "scissors"];

  const handleClick = (value) => {
    setUserchoice(value);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const random = choices[Math.floor(Math.random() * choices.length)];
    setCompchoice(random);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const moves = userchoice + compchoice;
    if (moves === "rockscissors" || moves === "scissorspaper" || moves === "paperrock") {
      setTurnresult(`You won!! as you chose ${userchoice} and computer chose ${compchoice}`);
    } else if (moves === "paperscissors" || moves === "rockpaper" || moves === "scissorsrock") {
      setTurnresult(`You lost!! as you chose ${userchoice} and the computer chose ${compchoice}`);
    } else if (moves === "rockrock" || moves === "paperpaper" || moves === "scissorsscissors") {
      setTurnresult(`Nobody won as it was a draw!! as you chose ${userchoice} and computer chose ${compchoice}`);
    }
  }, [userchoice, compchoice]);

  useEffect(() => {
    if (userscore >= 10 || compscore >= 10) {
      if (userscore > compscore) {
        setResult("You won the game!!");
      } else if (compscore > userscore) {
        setResult("Computer won the game");
      } else {
        setResult("It's a tie!");
      }
      setGameover(true);
    }
  }, [userscore, compscore]);

  const handleScore = (result) => {
    if (!gameover) {
      if (result === "win") {
        setUserscore((prevScore) => prevScore + 1);
      } else if (result === "lose") {
        setCompscore((prevScore) => prevScore + 1);
      }
    }
    setTotalMatches((prevMatches) => prevMatches - 1);
  };

  return (
    <div className="main">
      <div className="score">
        <h1>User score - {userscore}</h1>
        <h1>Computer score - {compscore}</h1>
      </div>

      <div className="choice">
        <div className="user-choice">
          <img className="user-hand" src={`../images/${userchoice}.png`} width="200px" height="100px" alt="User choice" />
        </div>
        <div className="comp-choice">
          <img className="comp-hand" src={`../images/${compchoice}.png`} width="200px" height="100px" alt="Computer choice" />
        </div>
      </div>

      <div className="button-div">
        {choices.map((choice, index) => (
          <button
            className="button"
            key={index}
            onClick={() => {
              handleClick(choice);
              handleScore(choice === userchoice ? "tie" : choice === choices[(choices.indexOf(userchoice) + 1) % 3] ? "win" : "lose");
            }}
            disabled={gameover || totalMatches <= 0}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="turn-result">
        <h1>Turn Result - {turnresult}</h1>
      </div>
      <div className="final-result">
        <h1>Final Result - {result}</h1>
      </div>

      <div className="restart-div">
        {gameover && (
          <button className="reset" onClick={() => reset()}>
            Restart?
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
