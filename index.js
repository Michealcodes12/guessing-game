import chalk from "chalk";
import welcome from "./welcome.js";
import selectDiffculty from "./selectlevel.js";
import { input, select } from "@inquirer/prompts";
import formatTime from "./formatTime.js";
import { updateHighscore } from "./highscore/updatehighscore.js";
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
  const { attempts, maxnumber, highscore, name } = choice;
  let chances = attempts;
  const randomeNumber = parseInt(Math.random() * maxnumber + 1, 10);
  const starttime = new Date();
  //  the loops continues unless user decides to end the game
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
      const remainchance = attempts - chances;
      console.log(message);
      updateHighscore(name, timetaken, remainchance);
      // End the game
      //  Ask the user to continue or try again
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
      //  -------------------
    } else {
      chances--;
      //  display different encouraging words for the user
      if (chances > 0) {
        const randomIndex = Math.floor(Math.random() * encouragingWords.length);
        console.log(`${chalk.red(encouragingWords[randomIndex])} }`);
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
    //  Ask the user if he will wish to continue
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
