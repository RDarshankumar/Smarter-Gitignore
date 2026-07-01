"use strict";
// Mock for the 'vscode' module — used by Jest (not available outside VS Code host)
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionContext = exports.commands = exports.ThemeColor = exports.FileType = exports.ViewColumn = exports.ProgressLocation = exports.StatusBarAlignment = exports.Uri = exports.workspace = exports.window = void 0;
exports.window = {
    createOutputChannel: jest.fn(() => ({
        appendLine: jest.fn(),
        show: jest.fn(),
        dispose: jest.fn(),
    })),
    showInformationMessage: jest.fn().mockResolvedValue(undefined),
    showWarningMessage: jest.fn().mockResolvedValue(undefined),
    showErrorMessage: jest.fn().mockResolvedValue(undefined),
    withProgress: jest.fn((_, task) => task({ report: jest.fn() })),
    showTextDocument: jest.fn().mockResolvedValue(undefined),
    createStatusBarItem: jest.fn(() => ({
        text: '',
        tooltip: '',
        command: '',
        backgroundColor: undefined,
        show: jest.fn(),
        hide: jest.fn(),
        dispose: jest.fn(),
    })),
};
exports.workspace = {
    getConfiguration: jest.fn(() => ({
        get: jest.fn((key, defaultValue) => defaultValue),
    })),
    openTextDocument: jest.fn().mockResolvedValue({}),
    workspaceFolders: undefined,
    fs: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
        stat: jest.fn(),
        readDirectory: jest.fn(),
    },
};
exports.Uri = {
    file: jest.fn((path) => ({ fsPath: path, path })),
};
exports.StatusBarAlignment = {
    Left: 1,
    Right: 2,
};
exports.ProgressLocation = {
    Notification: 15,
    SourceControl: 1,
    Window: 10,
};
exports.ViewColumn = {
    Active: -1,
    Beside: -2,
    One: 1,
    Two: 2,
};
exports.FileType = {
    Unknown: 0,
    File: 1,
    Directory: 2,
    SymbolicLink: 64,
};
exports.ThemeColor = jest.fn((id) => ({ id }));
exports.commands = {
    registerCommand: jest.fn(),
    executeCommand: jest.fn(),
};
exports.ExtensionContext = jest.fn();
//# sourceMappingURL=vscode.js.map