import * as vscode from 'vscode';
import { Logger } from './utils/logger';
import { StatusBarProvider } from './providers/statusBarProvider';
import { NotificationProvider } from './providers/notificationProvider';
import { generateGitIgnoreCommand } from './commands/generateGitIgnore';
import { updateGitIgnoreCommand, removeDuplicatesCommand } from './commands/updateGitIgnore';
import { previewGitIgnoreCommand, analyzeWorkspaceCommand } from './commands/previewGitIgnore';
import { WorkspaceScanner } from './scanner/workspaceScanner';

let statusBar: StatusBarProvider;
let notifications: NotificationProvider;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  Logger.initialize();
  Logger.info('Smart GitIgnore activated');

  statusBar = new StatusBarProvider();
  notifications = new NotificationProvider();

  const commands: [string, () => Promise<void>][] = [
    [
      'smartGitIgnore.generate',
      () => generateGitIgnoreCommand(statusBar, notifications),
    ],
    [
      'smartGitIgnore.update',
      () => updateGitIgnoreCommand(statusBar, notifications),
    ],
    [
      'smartGitIgnore.preview',
      () => previewGitIgnoreCommand(statusBar, notifications),
    ],
    [
      'smartGitIgnore.removeDuplicates',
      () => removeDuplicatesCommand(statusBar, notifications),
    ],
    [
      'smartGitIgnore.analyze',
      () => analyzeWorkspaceCommand(notifications),
    ],
  ];

  for (const [id, handler] of commands) {
    context.subscriptions.push(
      vscode.commands.registerCommand(id, handler)
    );
  }

  context.subscriptions.push(statusBar);

  await handleAutoActions();
}

async function handleAutoActions(): Promise<void> {
  const config = vscode.workspace.getConfiguration('smartGitIgnore');
  const scanner = new WorkspaceScanner();
  const workspaceRoot = scanner.getWorkspaceRoot();

  if (!workspaceRoot) {
    return;
  }

  if (config.get<boolean>('autoGenerate', false)) {
    Logger.info('autoGenerate is enabled — running on startup');
    await generateGitIgnoreCommand(statusBar, notifications);
    return;
  }

  if (config.get<boolean>('autoUpdate', false)) {
    Logger.info('autoUpdate is enabled — running on startup');
    await updateGitIgnoreCommand(statusBar, notifications);
  }
}

export function deactivate(): void {
  Logger.info('Smart GitIgnore deactivated');
  Logger.dispose();
  statusBar?.dispose();
}
