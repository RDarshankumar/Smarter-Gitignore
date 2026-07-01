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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const logger_1 = require("./utils/logger");
const statusBarProvider_1 = require("./providers/statusBarProvider");
const notificationProvider_1 = require("./providers/notificationProvider");
const generateGitIgnore_1 = require("./commands/generateGitIgnore");
const updateGitIgnore_1 = require("./commands/updateGitIgnore");
const previewGitIgnore_1 = require("./commands/previewGitIgnore");
const workspaceScanner_1 = require("./scanner/workspaceScanner");
let statusBar;
let notifications;
async function activate(context) {
    logger_1.Logger.initialize();
    logger_1.Logger.info('Smart GitIgnore activated');
    statusBar = new statusBarProvider_1.StatusBarProvider();
    notifications = new notificationProvider_1.NotificationProvider();
    const commands = [
        [
            'smartGitIgnore.generate',
            () => (0, generateGitIgnore_1.generateGitIgnoreCommand)(statusBar, notifications),
        ],
        [
            'smartGitIgnore.update',
            () => (0, updateGitIgnore_1.updateGitIgnoreCommand)(statusBar, notifications),
        ],
        [
            'smartGitIgnore.preview',
            () => (0, previewGitIgnore_1.previewGitIgnoreCommand)(statusBar, notifications),
        ],
        [
            'smartGitIgnore.removeDuplicates',
            () => (0, updateGitIgnore_1.removeDuplicatesCommand)(statusBar, notifications),
        ],
        [
            'smartGitIgnore.analyze',
            () => (0, previewGitIgnore_1.analyzeWorkspaceCommand)(notifications),
        ],
    ];
    for (const [id, handler] of commands) {
        context.subscriptions.push(vscode.commands.registerCommand(id, handler));
    }
    context.subscriptions.push(statusBar);
    await handleAutoActions();
}
async function handleAutoActions() {
    const config = vscode.workspace.getConfiguration('smartGitIgnore');
    const scanner = new workspaceScanner_1.WorkspaceScanner();
    const workspaceRoot = scanner.getWorkspaceRoot();
    if (!workspaceRoot) {
        return;
    }
    if (config.get('autoGenerate', false)) {
        logger_1.Logger.info('autoGenerate is enabled — running on startup');
        await (0, generateGitIgnore_1.generateGitIgnoreCommand)(statusBar, notifications);
        return;
    }
    if (config.get('autoUpdate', false)) {
        logger_1.Logger.info('autoUpdate is enabled — running on startup');
        await (0, updateGitIgnore_1.updateGitIgnoreCommand)(statusBar, notifications);
    }
}
function deactivate() {
    logger_1.Logger.info('Smart GitIgnore deactivated');
    logger_1.Logger.dispose();
    statusBar?.dispose();
}
//# sourceMappingURL=extension.js.map