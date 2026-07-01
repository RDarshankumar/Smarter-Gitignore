"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class DockerDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detected = rootFiles.includes('Dockerfile') ||
            rootFiles.includes('docker-compose.yml') ||
            rootFiles.includes('docker-compose.yaml') ||
            rootFiles.some(f => f.startsWith('Dockerfile.'));
        return {
            detected,
            technology: 'Docker',
            category: constants_1.CATEGORIES.DOCKER,
            confidence: detected ? 'high' : 'low',
        };
    }
}
exports.DockerDetector = DockerDetector;
//# sourceMappingURL=dockerDetector.js.map