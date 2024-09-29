import chalk from 'chalk';

import { Command } from '../types/command.interface.js';
import { CommandName } from '../types/command-name.enum.js';

const message = `
Программа для подготовки данных для REST API сервера.

Использование: ${chalk.green('cli.js <command> [arguments]')}

  ${chalk.green('--help')}                            Выводит этот текст
  ${chalk.green('--version')}                         Выводит информацию о версии приложения
  ${chalk.green('--import <filepath>')}               Импортирует данные из tsv-файла
  ${chalk.green('--generate <n> <filepath> <url>')}   Создаёт tsv-файл с произвольным количеством тестовых данных
`;

export class HelpCommand implements Command {
  public getName(): string {
    return CommandName.Help;
  }

  public run(..._parameters: string[]): void {
    console.info(message);
  }
}
