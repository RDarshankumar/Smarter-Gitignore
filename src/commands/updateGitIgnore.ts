import * as vscode from 'vscode';
import { WorkspaceScanner } from '../scanner/workspaceScanner';
import { RuleBuilder } from '../scanner/ruleBuilder';
import { GitignoreUpdater } from '../updater/gitignoreUpdater';
import { StatusBarProvider } from '../providers/statusBarProvider';
import { NotificationProvider } from '../providers/notificationProvider';
import { Logger } from '../utils/logger';

export async function updateGitIgnoreCommand(
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

    const result = await notifications.showProgress('Updating .gitignore...', async progress => {
      progress.report({ message: 'Scanning workspace...' });
      const scanResult = await scanner.scan(workspaceRoot);

      progress.report({ message: 'Building rules...' });
      const builder = new RuleBuilder();
      const groups = builder.build(scanResult.detectedTechnologies);

      progress.report({ message: 'Merging rules...' });
      const updater = new GitignoreUpdater();
      const updateResult = await updater.update(workspaceRoot, groups);

      return { updateResult, scanResult };
    });

    const { updateResult } = result;

    if (updateResult.addedRules === 0) {
      await notifications.showSuccess('No new rules found. Your .gitignore is already up to date.');
      statusBar.setReady();
      return;
    }

    const action = await notifications.showSuccess(
      `Found ${updateResult.addedRules} new rules to add.`,
      'Apply',
      'Preview',
      'Cancel'
    );

    if (action === 'Apply') {
      const updater = new GitignoreUpdater();
      await updater.write(workspaceRoot, updateResult.content);
      await notifications.showSuccess(`Added ${updateResult.addedRules} rules to .gitignore.`);
      Logger.info(`Updated .gitignore: added ${updateResult.addedRules}, skipped ${updateResult.skippedRules}`);
    } else if (action === 'Preview') {
      await notifications.showPreview(updateResult.content);
    }

    statusBar.setReady();
  } catch (error) {
    statusBar.setError();
    Logger.error('Update command failed', error as Error);
    await notifications.showError(`Failed to update .gitignore: ${(error as Error).message}`);
  }
}

export async function removeDuplicatesCommand(
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
    const { DuplicateCleaner } = await import('../updater/duplicateCleaner');
    const { FileUtils } = await import('../utils/fileUtils');
    const { GITIGNORE_FILE } = await import('../utils/constants');
    const path = await import('path');

    const gitignorePath = path.join(workspaceRoot, GITIGNORE_FILE);
    const exists = await FileUtils.exists(gitignorePath);

    if (!exists) {
      await notifications.showWarning('No .gitignore file found in workspace root.');
      return;
    }

    const content = await FileUtils.readFile(gitignorePath);
    const cleaner = new DuplicateCleaner();
    const { cleaned, removedCount } = cleaner.clean(content);

    if (removedCount === 0) {
      await notifications.showSuccess('No duplicates found.');
      return;
    }

    const action = await notifications.showSuccess(
      `Found ${removedCount} duplicate entries.`,
      'Remove',
      'Preview',
      'Cancel'
    );

    if (action === 'Remove') {
      await FileUtils.writeFile(gitignorePath, cleaned);
      await notifications.showSuccess(`Removed ${removedCount} duplicate entries.`);
    } else if (action === 'Preview') {
      await notifications.showPreview(cleaned);
    }
  } catch (error) {
    statusBar.setError();
    Logger.error('Remove duplicates command failed', error as Error);
    await notifications.showError(`Failed: ${(error as Error).message}`);
  }
}
