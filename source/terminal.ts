import readline from "readline/promises";
import { IO } from "./IO";
import { Task } from "./Task";

export const puts = (text: string): IO<void> => {
  return IO(console.log(text));
};

export const getInput = (headline: string): Task<Error, string> =>
  Task((fail, done) => {
    const terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    terminal
      .question(headline)
      .then((input) => (done(input), terminal.close()), fail)
  });
