import { FileUtils } from '../utils/fileUtils';
import { Logger } from '../utils/logger';

export interface FolderScanResult {
  detectedFolders: string[];
}

const KNOWN_GENERATED_FOLDERS = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.cache',
  '.next',
  '.nuxt',
  '.angular',
  '.idea',
  '.vscode',
  'tmp',
  'temp',
  'vendor',
  'target',
  'bin',
  'obj',
  'out',
  '__pycache__',
  '.dart_tool',
  '.gradle',
  '.parcel-cache',
  '.turbo',
  '.vercel',
  '.firebase',
  '.pub',
  '.pub-cache',
  '.mypy_cache',
  '.pytest_cache',
  '.nyc_output',
  'htmlcov',
  '.tox',
  '.nox',
  'logs',
  'log',
];

export class FolderScanner {
  async scan(workspaceRoot: string): Promise<FolderScanResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detectedFolders: string[] = [];

    for (const folder of KNOWN_GENERATED_FOLDERS) {
      if (rootFiles.includes(folder)) {
        detectedFolders.push(folder);
        Logger.debug(`Detected generated folder: ${folder}`);
      }
    }

    return { detectedFolders };
  }
}
