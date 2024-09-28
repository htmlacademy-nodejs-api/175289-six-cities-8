import { Command } from '../types/command.interface.js';
import { CommandName } from '../types/command-name.enum.js';

const message = `
Программа для подготовки данных для REST API сервера.

Использование: cli.js <command> [arguments]

  --help                            Выводит этот текст
  --version                         Выводит информацию о версии приложения
  --import <filepath>               Импортирует данные из tsv-файла
  --generate <n> <filepath> <url>   Создаёт tsv-файл с произвольным количеством тестовых данных
`;

export class HelpCommand implements Command {
  public getName(): string {
    return CommandName.Help;
  }

  public run(..._parameters: string[]): void {
    console.info(message);
  }
}
