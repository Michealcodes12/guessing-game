import { readHighScore } from "./readhighscore.js";
import { writeFileSync } from "fs";

const filepath = process.cwd() + "/highscore.json";
export const updateHighscore = (name, time, remainder) => {
  const highscore = {
    name: name,
    timetaken: time,
    attemptremaining: remainder,
    score: 20,
  };
  const highscoredata = readHighScore();
  const findedscore = highscoredata.find((item) => item.name === name);
  if (highscoredata.length == 0 || findedscore == undefined) {
    highscoredata.push(highscore);
    writeFileSync(filepath, JSON.stringify(highscoredata, null, 2));
  } else {
    if (remainder > findedscore.attemptremaining) {
      return;
    } else {
      const filter = highscoredata.filter((item) => item.name !== name);
      filter.push({ ...highscore, score: 20 + 20 });

      writeFileSync(filepath, JSON.stringify(filter, null, 2));
      console.log(
        chalk.bgMagenta.bold(
          `🎉 New High Score on Difficulty: ${highscore.name} 🎉`
        )
      );
    }
  }
};
