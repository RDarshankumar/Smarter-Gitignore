"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class NodeDetector {
    async detect(files, workspaceRoot) {
        const markerFiles = ['package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '.nvmrc', '.node-version'];
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detected = markerFiles.some(m => rootFiles.includes(m));
        return {
            detected,
            technology: 'Node.js',
            category: constants_1.CATEGORIES.NODE,
            confidence: rootFiles.includes('package.json') ? 'high' : 'medium',
        };
    }
}
exports.NodeDetector = NodeDetector;
//# sourceMappingURL=nodeDetector.js.map