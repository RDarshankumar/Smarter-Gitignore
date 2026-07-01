"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlutterDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class FlutterDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const detected = rootFiles.includes('pubspec.yaml');
        return {
            detected,
            technology: 'Flutter/Dart',
            category: constants_1.CATEGORIES.FLUTTER,
            confidence: detected ? 'high' : 'low',
        };
    }
}
exports.FlutterDetector = FlutterDetector;
//# sourceMappingURL=flutterDetector.js.map