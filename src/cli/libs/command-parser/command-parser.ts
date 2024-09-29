type ParsedCommands = Record<string, string[]>

export class CommandParser {
  static parse(args: string[]): ParsedCommands {
    const parsedCommands: ParsedCommands = {};
    let currentCommand = '';

    for (const argument of args) {
      if (argument.startsWith('--')) {
        parsedCommands[argument] = [];
        currentCommand = argument;
      } else if (currentCommand) {
        parsedCommands[currentCommand].push(argument);
      }
    }

    return parsedCommands;
  }
}
