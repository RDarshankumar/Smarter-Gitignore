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
exports.FileUtils = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const logger_1 = require("./logger");
class FileUtils {
    static async exists(filePath) {
        try {
            const uri = vscode.Uri.file(filePath);
            await vscode.workspace.fs.stat(uri);
            return true;
        }
        catch {
            return false;
        }
    }
    static async readFile(filePath) {
        const uri = vscode.Uri.file(filePath);
        const bytes = await vscode.workspace.fs.readFile(uri);
        return Buffer.from(bytes).toString('utf-8');
    }
    static async writeFile(filePath, content) {
        const uri = vscode.Uri.file(filePath);
        const bytes = Buffer.from(content, 'utf-8');
        await vscode.workspace.fs.writeFile(uri, bytes);
    }
    static async listFiles(dirPath) {
        try {
            const uri = vscode.Uri.file(dirPath);
            const entries = await vscode.workspace.fs.readDirectory(uri);
            return entries.map(([name]) => name);
        }
        catch (error) {
            logger_1.Logger.error(`Failed to list files in ${dirPath}`, error);
            return [];
        }
    }
    static async listFilesRecursive(dirPath, maxDepth = 3, currentDepth = 0) {
        if (currentDepth >= maxDepth) {
            return [];
        }
        const results = [];
        try {
            const uri = vscode.Uri.file(dirPath);
            const entries = await vscode.workspace.fs.readDirectory(uri);
            for (const [name, type] of entries) {
                const fullPath = path.join(dirPath, name);
                results.push(fullPath);
                if (type === vscode.FileType.Directory &&
                    !name.startsWith('.') &&
                    name !== 'node_modules' &&
                    name !== 'vendor' &&
                    name !== 'target' &&
                    name !== '__pycache__') {
                    const nested = await this.listFilesRecursive(fullPath, maxDepth, currentDepth + 1);
                    results.push(...nested);
                }
            }
        }
        catch (error) {
            logger_1.Logger.warn(`Could not read directory: ${dirPath}`);
        }
        return results;
    }
    static async getFileSizeMB(filePath) {
        try {
            const uri = vscode.Uri.file(filePath);
            const stat = await vscode.workspace.fs.stat(uri);
            return stat.size / (1024 * 1024);
        }
        catch {
            return 0;
        }
    }
    static getExtension(filePath) {
        return path.extname(filePath).toLowerCase();
    }
    static getBasename(filePath) {
        return path.basename(filePath);
    }
    static joinPath(...segments) {
        return path.join(...segments);
    }
}
exports.FileUtils = FileUtils;
//# sourceMappingURL=fileUtils.js.map