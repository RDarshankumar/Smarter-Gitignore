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
exports.Logger = void 0;
const vscode = __importStar(require("vscode"));
const constants_1 = require("./constants");
class Logger {
    static initialize() {
        this.outputChannel = vscode.window.createOutputChannel(constants_1.EXTENSION_NAME);
    }
    static info(message) {
        const timestamp = new Date().toISOString();
        this.outputChannel?.appendLine(`[${timestamp}] [INFO] ${message}`);
    }
    static warn(message) {
        const timestamp = new Date().toISOString();
        this.outputChannel?.appendLine(`[${timestamp}] [WARN] ${message}`);
    }
    static error(message, error) {
        const timestamp = new Date().toISOString();
        this.outputChannel?.appendLine(`[${timestamp}] [ERROR] ${message}`);
        if (error) {
            this.outputChannel?.appendLine(`  Stack: ${error.stack}`);
        }
    }
    static debug(message) {
        const timestamp = new Date().toISOString();
        this.outputChannel?.appendLine(`[${timestamp}] [DEBUG] ${message}`);
    }
    static show() {
        this.outputChannel?.show();
    }
    static dispose() {
        this.outputChannel?.dispose();
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map