"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
class JavaDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        const markers = ['pom.xml', 'build.gradle', 'build.gradle.kts', 'gradlew', 'mvnw'];
        const detected = markers.some(m => rootFiles.includes(m));
        return {
            detected,
            technology: 'Java',
            category: constants_1.CATEGORIES.JAVA,
            confidence: rootFiles.includes('pom.xml') || rootFiles.includes('build.gradle') ? 'high' : 'medium',
        };
    }
}
exports.JavaDetector = JavaDetector;
//# sourceMappingURL=javaDetector.js.map