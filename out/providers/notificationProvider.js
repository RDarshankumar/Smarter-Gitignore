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
exports.NotificationProvider = void 0;
const vscode = __importStar(require("vscode"));
class NotificationProvider {
    showSuccess(message, ...actions) {
        return vscode.window.showInformationMessage(`Smart GitIgnore: ${message}`, ...actions);
    }
    showWarning(message, ...actions) {
        return vscode.window.showWarningMessage(`Smart GitIgnore: ${message}`, ...actions);
    }
    showError(message, ...actions) {
        return vscode.window.showErrorMessage(`Smart GitIgnore: ${message}`, ...actions);
    }
    async showProgress(title, task) {
        return vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Smart GitIgnore: ${title}`,
            cancellable: false,
        }, task);
    }
    async showPreview(content, title = 'Preview: .gitignore') {
        const doc = await vscode.workspace.openTextDocument({
            content,
            language: 'ignore',
        });
        await vscode.window.showTextDocument(doc, {
            preview: true,
            viewColumn: vscode.ViewColumn.Beside,
        });
    }
    async showAnalysis(technologies) {
        if (technologies.length === 0) {
            await vscode.window.showInformationMessage('Smart GitIgnore: No technologies detected. Using common rules only.');
            return;
        }
        const message = `Detected technologies: ${technologies.join(', ')}`;
        await vscode.window.showInformationMessage(`Smart GitIgnore: ${message}`);
    }
}
exports.NotificationProvider = NotificationProvider;
//# sourceMappingURL=notificationProvider.js.map