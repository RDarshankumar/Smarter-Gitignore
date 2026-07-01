import * as vscode from 'vscode';
import { WorkspaceScanner } from '../scanner/workspaceScanner';
import { RuleBuilder } from '../scanner/ruleBuilder';
import { GitignoreUpdater } from '../updater/gitignoreUpdater';
import { StatusBarProvider } from '../providers/statusBarProvider';
import { NotificationProvider } from '../providers/notificationProvider';
import { Logger } from '../utils/logger';

export async function generateGitIgnoreCommand(
  statusBar: StatusBarProvider,
  notifications: NotificationProvider
): Promise<void> {
  const scanner = new WorkspaceScanner();
  const workspaceRoot = scanner.getWorkspaceRoot();

  if (!workspaceRoot) {
    await notifications.showError('No workspace folder open.');
    return;
  }

  try {
    statusBar.setScanning();

    const result = await notifications.showProgress('Scanning workspace...', async progress => {
      progress.report({ message: 'Scanning files...' });
      const scanResult = await scanner.scan(workspaceRoot);

      progress.report({ message: 'Building rules...' });
      const builder = new RuleBuilder();
      const groups = builder.build(scanResult.detectedTechnologies);

      progress.report({ message: 'Generating .gitignore...' });
      const updater = new GitignoreUpdater();
      const updateResult = await updater.generate(workspaceRoot, groups);

      return { updateResult, scanResult };
    });

    const { updateResult, scanResult } = result;

    statusBar.setGenerating();

    const techs = scanResult.detectedTechnologies.map(t => t.technology);
    const previewMsg = techs.length > 0
      ? `Detected: ${techs.join(', ')}. Added ${updateResult.addedRules} rules.`
      : `Added ${updateResult.addedRules} rules (common only).`;

    const action = await notifications.showSuccess(previewMsg, 'Write File', 'Preview', 'Cancel');

    if (action === 'Write File') {
      const updater = new GitignoreUpdater();
      await updater.write(workspaceRoot, updateResult.content);
      await notifications.showSuccess(`.gitignore generated with ${updateResult.addedRules} rules.`);
      Logger.info(`Generated .gitignore with ${updateResult.addedRules} rules`);
    } else if (action === 'Preview') {
      await notifications.showPreview(updateResult.content);
    }

    statusBar.setReady();
  } catch (error) {
    statusBar.setError();
    Logger.error('Generate command failed', error as Error);
    await notifications.showError(`Failed to generate .gitignore: ${(error as Error).message}`);
  }
}
