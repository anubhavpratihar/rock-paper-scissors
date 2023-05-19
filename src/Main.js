import React, { useState, useEffect } from 'react';

const Main = () => {
  const [userchoice, setUserchoice] = useState("rock");
  const [compchoice, setCompchoice] = useState("rock");
  const [userscore, setUserscore] = useState(0);
  const [compscore, setCompscore] = useState(0);
  const [result, setResult] = useState("Let's see who wins the game!");
  const [turnresult, setTurnresult] = useState(null);
  const [gameover, setGameover] = useState(false);

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
    if (!gameover) {
      if (
        (moves === "rockscissors" && userscore + 1 < 10) ||
        (moves === "scissorspaper" && userscore + 1 < 10) ||
        (moves === "paperrock" && userscore + 1 < 10)
      ) {
        setTurnresult(`You won!! as you chose ${userchoice} and computer chose ${compchoice}`);
        setUserscore(userscore + 1);
        if (userscore + 1 === 10) {
          setResult("You won the game!!");
          setGameover(true);
        }
      } else if (
        (moves === "paperscissors" && compscore + 1 < 10) ||
        (moves === "rockpaper" && compscore + 1 < 10) ||
        (moves === "scissorsrock" && compscore + 1 < 10)
      ) {
        setTurnresult(`You lost!! as you chose ${userchoice} and the computer chose ${compchoice}`);
        setCompscore(compscore + 1);
        if (compscore + 1 === 10) {
          setResult("Computer won the game");
          setGameover(true);
        }
      } else if (
        (moves === "rockrock" && userscore < 10) ||
        (moves === "paperpaper" && userscore < 10) ||
        (moves === "scissorsscissors" && userscore < 10)
      ) {
        setTurnresult(`Nobody won as it was a draw!! as you chose ${userchoice} and computer chose ${compchoice}`);
      }
    }
  }, [userchoice, compchoice, userscore, compscore, gameover]);

  return (
    <div className='main'>
      <div className='score'>
        <h1>User score - {userscore}</h1>
        <h1>Computer score - {compscore}</h1>
      </div>

      <div className='choice'>
        <div className='user-choice'>
          <img className='user-hand' src={`../images/${userchoice}.png`} width="200px" height="100px" alt="User choice" />
        </div>
        <div className='comp-choice'>
          <img className='comp-hand' src={`../images/${compchoice}.png`} width="200px" height="100px" alt="Computer choice" />
        </div>
      </div>

      <div className='button-div'>
        {choices.map((choice, index) => (
          <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameover}>
            {choice}
          </button>
        ))}
      </div>

      <div className='turn-result'>
        <h1>Turn Result - {turnresult}</h1>
      </div>
      <div className='final-result'>
        <h1>Final Result - {result}</h1>
      </div>

      <div className='restart-div'>
        {gameover && (
          <button className='reset' onClick={reset}>
            Restart?
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
