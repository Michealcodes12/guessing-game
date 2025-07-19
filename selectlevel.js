import { select } from "@inquirer/prompts";
import chalk from "chalk";
const Diffultity = {
  easy: {
    maxnumber: 10,
    attempts: 5,
    name: "Easy ",
  },
  medium: {
    maxnumber: 50,
    attempts: 3,
    name: "Medium",
  },
  hard: {
    maxnumber: 100,
    attempts: 2,
    name: "Hard ",
  },
};
async function selectDiffculty() {
  const choice = await select({
    message: "Select Difficulty",
    choices: [
      { name: Diffultity.easy.name, value: Diffultity.easy },
      { name: Diffultity.medium.name, value: Diffultity.medium },
      { name: Diffultity.hard.name, value: Diffultity.hard },
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
