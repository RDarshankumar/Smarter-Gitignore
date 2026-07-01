"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RustDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class RustDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detected = rootFiles.includes('Cargo.toml');
        return {
            detected,
            technology: 'Rust',
            category: constants_1.CATEGORIES.RUST,
            confidence: detected ? 'high' : 'low',
        };
    }
}
exports.RustDetector = RustDetector;
//# sourceMappingURL=rustDetector.js.map