// Mock for the 'vscode' module — used by Jest (not available outside VS Code host)

export const window = {
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

export const workspace = {
  getConfiguration: jest.fn(() => ({
    get: jest.fn((key: string, defaultValue: unknown) => defaultValue),
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

export const Uri = {
  file: jest.fn((path: string) => ({ fsPath: path, path })),
};

export const StatusBarAlignment = {
  Left: 1,
  Right: 2,
};

export const ProgressLocation = {
  Notification: 15,
  SourceControl: 1,
  Window: 10,
};

export const ViewColumn = {
  Active: -1,
  Beside: -2,
  One: 1,
  Two: 2,
};

export const FileType = {
  Unknown: 0,
  File: 1,
  Directory: 2,
  SymbolicLink: 64,
};

export const ThemeColor = jest.fn((id: string) => ({ id }));

export const commands = {
  registerCommand: jest.fn(),
  executeCommand: jest.fn(),
};

export const ExtensionContext = jest.fn();
