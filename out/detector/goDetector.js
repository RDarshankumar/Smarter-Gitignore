"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class GoDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detected = rootFiles.includes('go.mod');
        return {
            detected,
            technology: 'Go',
            category: constants_1.CATEGORIES.GO,
            confidence: detected ? 'high' : 'low',
        };
    }
}
exports.GoDetector = GoDetector;
//# sourceMappingURL=goDetector.js.map