import { Command } from '../types/command.interface.js';
import { CommandName } from '../types/command-name.enum.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return CommandName.Generate;
  }

  public run(..._parameters: string[]): void {
    // ToDo
  }
}
