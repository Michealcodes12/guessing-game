import chalk from "chalk";
import figlet from "figlet";
import { promisify } from "util";

const figletAsync = promisify(figlet);
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
async function welcome() {
  const data = await figletAsync("LUCKY GUESS");
  console.log(chalk.green(data));
  console.log(chalk.bgGreen.bold("Loading..."));
  await sleep();
}

export default welcome;
