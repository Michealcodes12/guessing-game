import { existsSync, readFileSync, writeFileSync } from "fs";

const filepath = process.cwd() + "/highscore.json";
export const readHighScore = () => {
  if (!existsSync(filepath)) {
    writeFileSync(filepath, JSON.stringify([]));
    return [];
  } else {
    const data = readFileSync(filepath, "utf-8");
    return JSON.parse(data);
  }
};
