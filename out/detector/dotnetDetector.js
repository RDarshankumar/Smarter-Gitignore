"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotnetDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class DotnetDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detected = rootFiles.some(f => f.endsWith('.csproj') || f.endsWith('.sln') || f.endsWith('.fsproj')) ||
            rootFiles.includes('global.json');
        return {
            detected,
            technology: '.NET',
            category: constants_1.CATEGORIES.DOTNET,
            confidence: detected ? 'high' : 'low',
        };
    }
}
exports.DotnetDetector = DotnetDetector;
//# sourceMappingURL=dotnetDetector.js.map