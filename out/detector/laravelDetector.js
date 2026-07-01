"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaravelDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class LaravelDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detected = rootFiles.includes('composer.json') && rootFiles.includes('artisan');
        return {
            detected,
            technology: 'Laravel',
            category: constants_1.CATEGORIES.LARAVEL,
            confidence: detected ? 'high' : 'low',
        };
    }
}
exports.LaravelDetector = LaravelDetector;
//# sourceMappingURL=laravelDetector.js.map