import * as vscode from 'vscode';
import * as path from 'path';
import { Logger } from './logger';

export class FileUtils {
  static async exists(filePath: string): Promise<boolean> {
    try {
      const uri = vscode.Uri.file(filePath);
      await vscode.workspace.fs.stat(uri);
      return true;
    } catch {
      return false;
    }
  }

  static async readFile(filePath: string): Promise<string> {
    const uri = vscode.Uri.file(filePath);
    const bytes = await vscode.workspace.fs.readFile(uri);
    return Buffer.from(bytes).toString('utf-8');
  }

  static async writeFile(filePath: string, content: string): Promise<void> {
    const uri = vscode.Uri.file(filePath);
    const bytes = Buffer.from(content, 'utf-8');
    await vscode.workspace.fs.writeFile(uri, bytes);
  }

  static async listFiles(dirPath: string): Promise<string[]> {
    try {
      const uri = vscode.Uri.file(dirPath);
      const entries = await vscode.workspace.fs.readDirectory(uri);
      return entries.map(([name]) => name);
    } catch (error) {
      Logger.error(`Failed to list files in ${dirPath}`, error as Error);
      return [];
    }
  }

  static async listFilesRecursive(
    dirPath: string,
    maxDepth = 3,
    currentDepth = 0
  ): Promise<string[]> {
    if (currentDepth >= maxDepth) {
      return [];
    }

    const results: string[] = [];

    try {
      const uri = vscode.Uri.file(dirPath);
      const entries = await vscode.workspace.fs.readDirectory(uri);

      for (const [name, type] of entries) {
        const fullPath = path.join(dirPath, name);
        results.push(fullPath);

        if (
          type === vscode.FileType.Directory &&
          !name.startsWith('.') &&
          name !== 'node_modules' &&
          name !== 'vendor' &&
          name !== 'target' &&
          name !== '__pycache__'
        ) {
          const nested = await this.listFilesRecursive(
            fullPath,
            maxDepth,
            currentDepth + 1
          );
          results.push(...nested);
        }
      }
    } catch (error) {
      Logger.warn(`Could not read directory: ${dirPath}`);
    }

    return results;
  }

  static async getFileSizeMB(filePath: string): Promise<number> {
    try {
      const uri = vscode.Uri.file(filePath);
      const stat = await vscode.workspace.fs.stat(uri);
      return stat.size / (1024 * 1024);
    } catch {
      return 0;
    }
  }

  static getExtension(filePath: string): string {
    return path.extname(filePath).toLowerCase();
  }

  static getBasename(filePath: string): string {
    return path.basename(filePath);
  }

  static joinPath(...segments: string[]): string {
    return path.join(...segments);
  }
}
