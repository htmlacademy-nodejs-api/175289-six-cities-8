import { CommandParser } from './libs/command-parser/index.js';

import { Command } from './types/command.interface.js';
import { CommandName } from './types/command-name.enum.js';

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};
  private defaultCommand = CommandName.Help;

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      const commandName = command.getName();

      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Command ${commandName} is already registered`);
      }

      this.commands[commandName] = command;
    });
  }

  public runCommand(argv: string[]): void {
    const parsedCommands = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommands);
    const command = this.getCommand(commandName);
    const commandParameters = parsedCommands[commandName] ?? [];
    command.run(...commandParameters);
  }

  private getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  private getDefaultCommand(): Command {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command ${this.defaultCommand} is not registered`);
    }
    return this.commands[this.defaultCommand];
  }
}
