"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularDetector = void 0;
const constants_1 = require("../utils/constants");
const fileUtils_1 = require("../utils/fileUtils");
const path = __importStar(require("path"));
class AngularDetector {
    async detect(files, workspaceRoot) {
        const rootFiles = await fileUtils_1.FileUtils.listFiles(workspaceRoot);
        if (rootFiles.includes('angular.json') || rootFiles.includes('.angular')) {
            return { detected: true, technology: 'Angular', category: constants_1.CATEGORIES.ANGULAR, confidence: 'high' };
        }
        try {
            const pkgContent = await fileUtils_1.FileUtils.readFile(path.join(workspaceRoot, 'package.json'));
            const pkg = JSON.parse(pkgContent);
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };
            const detected = '@angular/core' in deps;
            return { detected, technology: 'Angular', category: constants_1.CATEGORIES.ANGULAR, confidence: detected ? 'high' : 'low' };
        }
        catch {
            return { detected: false, technology: 'Angular', category: constants_1.CATEGORIES.ANGULAR, confidence: 'low' };
        }
    }
}
exports.AngularDetector = AngularDetector;
//# sourceMappingURL=angularDetector.js.map