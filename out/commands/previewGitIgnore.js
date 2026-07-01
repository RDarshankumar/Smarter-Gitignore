"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewGitIgnoreCommand = previewGitIgnoreCommand;
exports.analyzeWorkspaceCommand = analyzeWorkspaceCommand;
const workspaceScanner_1 = require("../scanner/workspaceScanner");
const ruleBuilder_1 = require("../scanner/ruleBuilder");
const gitignoreUpdater_1 = require("../updater/gitignoreUpdater");
const logger_1 = require("../utils/logger");
async function previewGitIgnoreCommand(statusBar, notifications) {
    const scanner = new workspaceScanner_1.WorkspaceScanner();
    const workspaceRoot = scanner.getWorkspaceRoot();
    if (!workspaceRoot) {
        await notifications.showError('No workspace folder open.');
        return;
    }
    try {
        statusBar.setScanning();
        const scanResult = await scanner.scan(workspaceRoot);
        const builder = new ruleBuilder_1.RuleBuilder();
        const groups = builder.build(scanResult.detectedTechnologies);
        const updater = new gitignoreUpdater_1.GitignoreUpdater();
        const updateResult = await updater.update(workspaceRoot, groups);
        await notifications.showPreview(updateResult.content, 'Preview: .gitignore (not saved)');
        statusBar.setReady();
        logger_1.Logger.info('Preview opened');
    }
    catch (error) {
        statusBar.setError();
        logger_1.Logger.error('Preview command failed', error);
        await notifications.showError(`Failed to preview: ${error.message}`);
    }
}
async function analyzeWorkspaceCommand(notifications) {
    const scanner = new workspaceScanner_1.WorkspaceScanner();
    const workspaceRoot = scanner.getWorkspaceRoot();
    if (!workspaceRoot) {
        await notifications.showError('No workspace folder open.');
        return;
    }
    try {
        const scanResult = await scanner.scan(workspaceRoot);
        const techs = scanResult.detectedTechnologies;
        const lines = [
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
        }
        else {
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
        }
        else {
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
    }
    catch (error) {
        logger_1.Logger.error('Analyze command failed', error);
        await notifications.showError(`Failed to analyze: ${error.message}`);
    }
}
//# sourceMappingURL=previewGitIgnore.js.map