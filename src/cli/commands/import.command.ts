import chalk from 'chalk';

import { TSVFileReader } from '../libs/file-reader/index.js';

import { Command } from '../types/command.interface.js';
import { CommandName } from '../types/command-name.enum.js';

export class ImportCommand implements Command {
  constructor() {
  }

  public getName(): string {
    return CommandName.Import;
  }

  public run(...parameters: string[]): void {
    const [filePath] = parameters;
    const fileReader = new TSVFileReader(filePath);

    try {
      const data = fileReader.read();
      console.log(data);
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to import data from file ${filePath}`));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
