"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderScanner = void 0;
const fileUtils_1 = require("../utils/fileUtils");
const logger_1 = require("../utils/logger");
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
class FolderScanner {
    async scan(workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detectedFolders = [];
        for (const folder of KNOWN_GENERATED_FOLDERS) {
            if (rootFiles.includes(folder)) {
                detectedFolders.push(folder);
                logger_1.Logger.debug(`Detected generated folder: ${folder}`);
            }
        }
        return { detectedFolders };
    }
}
exports.FolderScanner = FolderScanner;
//# sourceMappingURL=folderScanner.js.map