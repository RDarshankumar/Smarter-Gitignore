import * as vscode from 'vscode';
import * as path from 'path';
import { FileUtils } from '../utils/fileUtils';
import { Logger } from '../utils/logger';
import { LARGE_FILE_THRESHOLD_MB } from '../utils/constants';

export interface ScanResult {
  rootFiles: string[];
  allFiles: string[];
  largeFiles: string[];
  hasLargeMedia: boolean;
}

export class FileScanner {
  async scan(workspaceRoot: string): Promise<ScanResult> {
    Logger.info(`Scanning workspace: ${workspaceRoot}`);

    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const allFiles = await FileUtils.listFilesRecursive(workspaceRoot, 4);
    const largeFiles = await this.detectLargeFiles(allFiles);

    Logger.info(`Found ${rootFiles.length} root files, ${allFiles.length} total files`);

    return {
      rootFiles,
      allFiles: allFiles.map(f => path.basename(f)),
      largeFiles,
      hasLargeMedia: largeFiles.length > 0,
    };
  }

  private async detectLargeFiles(files: string[]): Promise<string[]> {
    const config = vscode.workspace.getConfiguration('smartGitIgnore');
    if (!config.get<boolean>('detectLargeFiles', true)) {
      return [];
    }

    const largeFiles: string[] = [];
    const mediaExtensions = ['.zip', '.rar', '.7z', '.mp4', '.mov', '.avi', '.iso', '.tar', '.gz', '.bz2'];

    for (const file of files) {
      const ext = FileUtils.getExtension(file);
      if (mediaExtensions.includes(ext)) {
        const sizeMB = await FileUtils.getFileSizeMB(file);
        if (sizeMB > LARGE_FILE_THRESHOLD_MB) {
          largeFiles.push(file);
        }
      }
    }

    return largeFiles;
  }
}
