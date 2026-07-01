"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGitIgnoreCommand = generateGitIgnoreCommand;
const workspaceScanner_1 = require("../scanner/workspaceScanner");
const ruleBuilder_1 = require("../scanner/ruleBuilder");
const gitignoreUpdater_1 = require("../updater/gitignoreUpdater");
const logger_1 = require("../utils/logger");
async function generateGitIgnoreCommand(statusBar, notifications) {
    const scanner = new workspaceScanner_1.WorkspaceScanner();
    const workspaceRoot = scanner.getWorkspaceRoot();
    if (!workspaceRoot) {
        await notifications.showError('No workspace folder open.');
        return;
    }
    try {
        statusBar.setScanning();
        const result = await notifications.showProgress('Scanning workspace...', async (progress) => {
            progress.report({ message: 'Scanning files...' });
            const scanResult = await scanner.scan(workspaceRoot);
            progress.report({ message: 'Building rules...' });
            const builder = new ruleBuilder_1.RuleBuilder();
            const groups = builder.build(scanResult.detectedTechnologies);
            progress.report({ message: 'Generating .gitignore...' });
            const updater = new gitignoreUpdater_1.GitignoreUpdater();
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
            const updater = new gitignoreUpdater_1.GitignoreUpdater();
            await updater.write(workspaceRoot, updateResult.content);
            await notifications.showSuccess(`.gitignore generated with ${updateResult.addedRules} rules.`);
            logger_1.Logger.info(`Generated .gitignore with ${updateResult.addedRules} rules`);
        }
        else if (action === 'Preview') {
            await notifications.showPreview(updateResult.content);
        }
        statusBar.setReady();
    }
    catch (error) {
        statusBar.setError();
        logger_1.Logger.error('Generate command failed', error);
        await notifications.showError(`Failed to generate .gitignore: ${error.message}`);
    }
}
//# sourceMappingURL=generateGitIgnore.js.map