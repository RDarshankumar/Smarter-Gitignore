"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateCleaner = void 0;
const logger_1 = require("../utils/logger");
class DuplicateCleaner {
    clean(content) {
        const lines = content.split('\n');
        const seen = new Set();
        const result = [];
        let removedCount = 0;
        for (const line of lines) {
            const trimmed = line.trim();
            // Always keep comments and blank lines
            if (trimmed === '' || trimmed.startsWith('#')) {
                result.push(line);
                continue;
            }
            if (seen.has(trimmed)) {
                removedCount++;
                logger_1.Logger.debug(`Removed duplicate: ${trimmed}`);
            }
            else {
                seen.add(trimmed);
                result.push(line);
            }
        }
        return { cleaned: result.join('\n'), removedCount };
    }
    extractExistingRules(content) {
        const rules = new Set();
        const lines = content.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                rules.add(trimmed);
            }
        }
        return rules;
    }
    extractExistingComments(content) {
        return content
            .split('\n')
            .filter(l => l.trim().startsWith('#'))
            .map(l => l.trim());
    }
}
exports.DuplicateCleaner = DuplicateCleaner;
//# sourceMappingURL=duplicateCleaner.js.map