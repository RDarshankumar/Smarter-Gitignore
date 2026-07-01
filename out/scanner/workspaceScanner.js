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
exports.WorkspaceScanner = void 0;
const vscode = __importStar(require("vscode"));
const fileScanner_1 = require("./fileScanner");
const folderScanner_1 = require("./folderScanner");
const nodeDetector_1 = require("../detector/nodeDetector");
const reactDetector_1 = require("../detector/reactDetector");
const nextDetector_1 = require("../detector/nextDetector");
const angularDetector_1 = require("../detector/angularDetector");
const vueDetector_1 = require("../detector/vueDetector");
const flutterDetector_1 = require("../detector/flutterDetector");
const laravelDetector_1 = require("../detector/laravelDetector");
const pythonDetector_1 = require("../detector/pythonDetector");
const javaDetector_1 = require("../detector/javaDetector");
const goDetector_1 = require("../detector/goDetector");
const rustDetector_1 = require("../detector/rustDetector");
const dotnetDetector_1 = require("../detector/dotnetDetector");
const dockerDetector_1 = require("../detector/dockerDetector");
const logger_1 = require("../utils/logger");
class WorkspaceScanner {
    constructor() {
        this.fileScanner = new fileScanner_1.FileScanner();
        this.folderScanner = new folderScanner_1.FolderScanner();
        this.detectors = [
            new nodeDetector_1.NodeDetector(),
            new reactDetector_1.ReactDetector(),
            new nextDetector_1.NextDetector(),
            new angularDetector_1.AngularDetector(),
            new vueDetector_1.VueDetector(),
            new flutterDetector_1.FlutterDetector(),
            new laravelDetector_1.LaravelDetector(),
            new pythonDetector_1.PythonDetector(),
            new javaDetector_1.JavaDetector(),
            new goDetector_1.GoDetector(),
            new rustDetector_1.RustDetector(),
            new dotnetDetector_1.DotnetDetector(),
            new dockerDetector_1.DockerDetector(),
        ];
    }
    async scan(workspaceRoot) {
        logger_1.Logger.info(`Starting workspace scan: ${workspaceRoot}`);
        const [scanResult, folderResult] = await Promise.all([
            this.fileScanner.scan(workspaceRoot),
            this.folderScanner.scan(workspaceRoot),
        ]);
        const detectionPromises = this.detectors.map(d => d.detect(scanResult.allFiles, workspaceRoot));
        const allResults = await Promise.all(detectionPromises);
        const detectedTechnologies = allResults.filter(r => r.detected);
        logger_1.Logger.info(`Detected technologies: ${detectedTechnologies.map(t => t.technology).join(', ')}`);
        return {
            workspaceRoot,
            detectedTechnologies,
            scanResult,
            folderResult,
        };
    }
    getWorkspaceRoot() {
        const folders = vscode.workspace.workspaceFolders;
        return folders && folders.length > 0 ? folders[0].uri.fsPath : undefined;
    }
}
exports.WorkspaceScanner = WorkspaceScanner;
//# sourceMappingURL=workspaceScanner.js.map