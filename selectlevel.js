import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { readHighScore } from "./highscore/readhighscore.js";

const highscoredata = readHighScore();
const Diffultity = {
  easy: {
    maxnumber: 10,
    attempts: 5,
    name: "Easy ",
    highscore: 0,
  },
  medium: {
    maxnumber: 50,
    attempts: 7,
    name: "Medium",
    highscore: 0,
  },
  hard: {
    maxnumber: 100,
    attempts: 10,
    name: "Hard ",
    highscore: 0,
  },
};

function checkHighscore(name) {
  if (highscoredata.length === 0) {
    return undefined;
  }
  const findindex = highscoredata.find((item) => item.name === name);

  return findindex;
}

console.log(checkHighscore(Diffultity.medium.name));
async function selectDiffculty() {
  const choice = await select({
    message: "Select Difficulty",
    choices: [
      {
        name: `${Diffultity.easy.name} (High Score: ${
          checkHighscore(Diffultity.easy.name)
            ? checkHighscore(Diffultity.easy.name)?.score
            : 0
        })`,
        value: Diffultity.easy,
      },
      {
        name: `${Diffultity.easy.name} (High Score: ${
          checkHighscore(Diffultity.medium.name)
            ? checkHighscore(Diffultity.medium.name)?.score
            : 0
        })`,
        value: Diffultity.medium,
      },
      {
        name: `${Diffultity.easy.name} (High Score: ${
          checkHighscore(Diffultity.hard.name)
            ? checkHighscore(Diffultity.hard.name)?.score
            : 0
        })`,
        value: Diffultity.hard,
      },
    ],
  });

  const message = `
    ${chalk.bgBlue.bold(" HOW TO PLAY ")}
    I'm thinking of a number between ${chalk.yellow("1")} and ${chalk.yellow(
    `${choice.maxnumber}`
  )}.
    You have ${chalk.yellow(`${choice.attempts}`)} tries to guess it.
    
    Let's begin... ${chalk.bgRedBright.bold("let see your lucky charms:)")}
  `;

  return { message: message, choice: choice };
}

export default selectDiffculty;
