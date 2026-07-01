"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythonDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class PythonDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const markers = ['requirements.txt', 'setup.py', 'setup.cfg', 'pyproject.toml', 'Pipfile', 'poetry.lock'];
        const detected = markers.some(m => rootFiles.includes(m));
        return {
            detected,
            technology: 'Python',
            category: constants_1.CATEGORIES.PYTHON,
            confidence: detected ? 'high' : 'low',
        };
    }
}
exports.PythonDetector = PythonDetector;
//# sourceMappingURL=pythonDetector.js.map