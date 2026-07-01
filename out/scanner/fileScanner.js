"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileScanner = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fileUtils_1 = require("../utils/fileUtils");
const logger_1 = require("../utils/logger");
const constants_1 = require("../utils/constants");
class FileScanner {
    async scan(workspaceRoot) {
        logger_1.Logger.info(`Scanning workspace: ${workspaceRoot}`);
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const allFiles = await fileUtils_1.FileUtils.listFilesRecursive(workspaceRoot, 4);
        const largeFiles = await this.detectLargeFiles(allFiles);
        logger_1.Logger.info(`Found ${rootFiles.length} root files, ${allFiles.length} total files`);
        return {
            rootFiles,
            allFiles: allFiles.map(f => path.basename(f)),
            largeFiles,
            hasLargeMedia: largeFiles.length > 0,
        };
    }
    async detectLargeFiles(files) {
        const config = vscode.workspace.getConfiguration('smartGitIgnore');
        if (!config.get('detectLargeFiles', true)) {
            return [];
        }
        const largeFiles = [];
        const mediaExtensions = ['.zip', '.rar', '.7z', '.mp4', '.mov', '.avi', '.iso', '.tar', '.gz', '.bz2'];
        for (const file of files) {
            const ext = fileUtils_1.FileUtils.getExtension(file);
            if (mediaExtensions.includes(ext)) {
                const sizeMB = await fileUtils_1.FileUtils.getFileSizeMB(file);
                if (sizeMB > constants_1.LARGE_FILE_THRESHOLD_MB) {
                    largeFiles.push(file);
                }
            }
        }
        return largeFiles;
    }
}
exports.FileScanner = FileScanner;
//# sourceMappingURL=fileScanner.js.map