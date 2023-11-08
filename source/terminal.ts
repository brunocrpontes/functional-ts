import readline from "readline/promises";
import { IO } from "./IO";
import { Task } from "./Task";

export const puts = (text: string): IO<void> => {
  return IO(console.log(text));
}

const T = Task.of(2).fork(console.log, console.error)

export const getInput = (headline: string): Task<IO<string>, Error> => Task((done, fail) => {
  const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
  terminal.question(headline)
    .then(input => done(IO(input)), fail)
    .then(() => terminal.close())
})
