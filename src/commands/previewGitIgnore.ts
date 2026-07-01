import { WorkspaceScanner } from '../scanner/workspaceScanner';
import { RuleBuilder } from '../scanner/ruleBuilder';
import { GitignoreUpdater } from '../updater/gitignoreUpdater';
import { StatusBarProvider } from '../providers/statusBarProvider';
import { NotificationProvider } from '../providers/notificationProvider';
import { Logger } from '../utils/logger';

export async function previewGitIgnoreCommand(
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

    const scanResult = await scanner.scan(workspaceRoot);
    const builder = new RuleBuilder();
    const groups = builder.build(scanResult.detectedTechnologies);
    const updater = new GitignoreUpdater();
    const updateResult = await updater.update(workspaceRoot, groups);

    await notifications.showPreview(updateResult.content, 'Preview: .gitignore (not saved)');

    statusBar.setReady();
    Logger.info('Preview opened');
  } catch (error) {
    statusBar.setError();
    Logger.error('Preview command failed', error as Error);
    await notifications.showError(`Failed to preview: ${(error as Error).message}`);
  }
}

export async function analyzeWorkspaceCommand(
  notifications: NotificationProvider
): Promise<void> {
  const scanner = new WorkspaceScanner();
  const workspaceRoot = scanner.getWorkspaceRoot();

  if (!workspaceRoot) {
    await notifications.showError('No workspace folder open.');
    return;
  }

  try {
    const scanResult = await scanner.scan(workspaceRoot);
    const techs = scanResult.detectedTechnologies;

    const lines: string[] = [
      '# Smart GitIgnore — Workspace Analysis',
      '',
      `Workspace: ${workspaceRoot}`,
      `Root files scanned: ${scanResult.scanResult.rootFiles.length}`,
      `Total files scanned: ${scanResult.scanResult.allFiles.length}`,
      '',
      '## Detected Technologies',
      '',
    ];

    if (techs.length === 0) {
      lines.push('  No specific technologies detected.');
    } else {
      for (const tech of techs) {
        lines.push(`  ✓ ${tech.technology} (confidence: ${tech.confidence})`);
      }
    }

    lines.push('');
    lines.push('## Detected Generated Folders');
    lines.push('');

    const folders = scanResult.folderResult.detectedFolders;
    if (folders.length === 0) {
      lines.push('  None found.');
    } else {
      for (const folder of folders) {
        lines.push(`  • ${folder}/`);
      }
    }

    if (scanResult.scanResult.hasLargeMedia) {
      lines.push('');
      lines.push('## Large Media Files');
      lines.push('');
      lines.push('  Large files detected — consider adding media patterns to .gitignore.');
    }

    await notifications.showPreview(lines.join('\n'), 'Workspace Analysis');
  } catch (error) {
    Logger.error('Analyze command failed', error as Error);
    await notifications.showError(`Failed to analyze: ${(error as Error).message}`);
  }
}
