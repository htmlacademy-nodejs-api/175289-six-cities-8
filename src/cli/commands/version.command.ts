import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Command } from '../types/command.interface.js';
import { CommandName } from '../types/command-name.enum.js';

type PackageJsonConfig = {
  version: string;
}

const isPackageJsonConfig = (value: unknown): value is PackageJsonConfig => (
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.hasOwn(value, 'version')
);

export class VersionCommand implements Command {
  private readonly filePath = 'package.json';

  private getVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const parsedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJsonConfig(parsedContent)) {
      throw new Error(`File ${this.filePath} does not contain version information`);
    }

    return parsedContent.version;
  }

  public getName(): string {
    return CommandName.Version;
  }

  public run(..._parameters: string[]): void {
    try {
      const version = this.getVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
