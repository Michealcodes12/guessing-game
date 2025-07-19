import chalk from "chalk";
import welcome from "./welcome.js";
import selectDiffculty from "./selectlevel.js";
import { input, select } from "@inquirer/prompts";
import formatTime from "./formatTime.js";
// this generate number bettwen 1 - 100

async function game() {
  const { message, choice } = await selectDiffculty();
  const encouragingWords = [
    "Not quite! Give it another shot.",
    "You're getting warmer! Try again.",
    "That's not it, but don't give up!",
    "Almost there! Keep guessing.",
    "Nope, try a different number.",
    "So close! Let's see that lucky charm work its magic :)",
  ];
  console.log(message);
  const { attempts, maxnumber, name } = choice;
  let chances = attempts;
  const randomeNumber = parseInt(Math.random() * maxnumber);
  const starttime = new Date();
  while (true) {
    const answer = await input({
      message: `you have ${chances} chances left`,
      validate: (value) => {
        const num = parseInt(value, 10);
        if (isNaN(num) || num < 1 || num > maxnumber) {
          return `pls enter a number between 1 and ${maxnumber}`;
        } else {
          return true;
        }
      },
    });
    if (parseInt(answer, 10) === randomeNumber) {
      console.log(
        chalk.green(`Congratulations! You guessed it! You win! in ${chances}`)
      );
      const endtime = new Date();
      const timetaken = endtime - starttime;
      const message = formatTime(timetaken);
      console.log(message);
      // End the game
    } else {
      chances--;

      if (chances > 0) {
        const randomIndex = Math.floor(Math.random() * encouragingWords.length);
        console.log(
          `${chalk.red(encouragingWords[randomIndex])} ${chalk.yellow.bold(
            `try guessing a bit ${answer < randomeNumber ? "higher" : "lower"}`
          )}`
        );
      } else {
        console.log(
          chalk.red(
            `Sorry, you're out of guesses! The number was ${randomeNumber} :).`
          )
        );
        const endtime = new Date();
        const timetaken = endtime - starttime;
        const message = formatTime(timetaken);

        console.log(message);
      }
    }

    if (chances === 0) {
      const answer = await select({
        message: "Do you wish yo continue",
        choices: [
          { name: "End Game", value: "No" },
          { name: "Try Again", value: "Yes" },
        ],
      });
      switch (answer) {
        case "No":
          console.log(chalk.bgGreen.bold("You did great. See you next time"));
          return;
        case "Yes":
          chances = attempts;
          break;
      }
    }
  }
}

await welcome();
await game();
