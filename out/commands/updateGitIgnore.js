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
exports.updateGitIgnoreCommand = updateGitIgnoreCommand;
exports.removeDuplicatesCommand = removeDuplicatesCommand;
const workspaceScanner_1 = require("../scanner/workspaceScanner");
const ruleBuilder_1 = require("../scanner/ruleBuilder");
const gitignoreUpdater_1 = require("../updater/gitignoreUpdater");
const logger_1 = require("../utils/logger");
async function updateGitIgnoreCommand(statusBar, notifications) {
    const scanner = new workspaceScanner_1.WorkspaceScanner();
    const workspaceRoot = scanner.getWorkspaceRoot();
    if (!workspaceRoot) {
        await notifications.showError('No workspace folder open.');
        return;
    }
    try {
        statusBar.setScanning();
        const result = await notifications.showProgress('Updating .gitignore...', async (progress) => {
            progress.report({ message: 'Scanning workspace...' });
            const scanResult = await scanner.scan(workspaceRoot);
            progress.report({ message: 'Building rules...' });
            const builder = new ruleBuilder_1.RuleBuilder();
            const groups = builder.build(scanResult.detectedTechnologies);
            progress.report({ message: 'Merging rules...' });
            const updater = new gitignoreUpdater_1.GitignoreUpdater();
            const updateResult = await updater.update(workspaceRoot, groups);
            return { updateResult, scanResult };
        });
        const { updateResult } = result;
        if (updateResult.addedRules === 0) {
            await notifications.showSuccess('No new rules found. Your .gitignore is already up to date.');
            statusBar.setReady();
            return;
        }
        const action = await notifications.showSuccess(`Found ${updateResult.addedRules} new rules to add.`, 'Apply', 'Preview', 'Cancel');
        if (action === 'Apply') {
            const updater = new gitignoreUpdater_1.GitignoreUpdater();
            await updater.write(workspaceRoot, updateResult.content);
            await notifications.showSuccess(`Added ${updateResult.addedRules} rules to .gitignore.`);
            logger_1.Logger.info(`Updated .gitignore: added ${updateResult.addedRules}, skipped ${updateResult.skippedRules}`);
        }
        else if (action === 'Preview') {
            await notifications.showPreview(updateResult.content);
        }
        statusBar.setReady();
    }
    catch (error) {
        statusBar.setError();
        logger_1.Logger.error('Update command failed', error);
        await notifications.showError(`Failed to update .gitignore: ${error.message}`);
    }
}
async function removeDuplicatesCommand(statusBar, notifications) {
    const scanner = new workspaceScanner_1.WorkspaceScanner();
    const workspaceRoot = scanner.getWorkspaceRoot();
    if (!workspaceRoot) {
        await notifications.showError('No workspace folder open.');
        return;
    }
    try {
        const { DuplicateCleaner } = await Promise.resolve().then(() => __importStar(require('../updater/duplicateCleaner')));
        const { FileUtils } = await Promise.resolve().then(() => __importStar(require('../utils/fileUtils')));
        const { GITIGNORE_FILE } = await Promise.resolve().then(() => __importStar(require('../utils/constants')));
        const path = await Promise.resolve().then(() => __importStar(require('path')));
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
        const action = await notifications.showSuccess(`Found ${removedCount} duplicate entries.`, 'Remove', 'Preview', 'Cancel');
        if (action === 'Remove') {
            await FileUtils.writeFile(gitignorePath, cleaned);
            await notifications.showSuccess(`Removed ${removedCount} duplicate entries.`);
        }
        else if (action === 'Preview') {
            await notifications.showPreview(cleaned);
        }
    }
    catch (error) {
        statusBar.setError();
        logger_1.Logger.error('Remove duplicates command failed', error);
        await notifications.showError(`Failed: ${error.message}`);
    }
}
//# sourceMappingURL=updateGitIgnore.js.map