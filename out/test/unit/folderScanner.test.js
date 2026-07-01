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
const vscode = __importStar(require("vscode"));
const folderScanner_1 = require("../../scanner/folderScanner");
function mockRootFiles(names) {
    vscode.workspace.fs.readDirectory.mockResolvedValue(names.map(n => [n, vscode.FileType.Directory]));
}
const ROOT = '/workspace';
beforeEach(() => {
    jest.clearAllMocks();
});
describe('FolderScanner', () => {
    let scanner;
    beforeEach(() => {
        scanner = new folderScanner_1.FolderScanner();
    });
    it('detects node_modules/', async () => {
        mockRootFiles(['node_modules', 'src', 'dist']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toContain('node_modules');
    });
    it('detects .next/', async () => {
        mockRootFiles(['.next', 'src']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toContain('.next');
    });
    it('detects __pycache__/', async () => {
        mockRootFiles(['__pycache__', 'app.py']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toContain('__pycache__');
    });
    it('detects multiple generated folders at once', async () => {
        mockRootFiles(['node_modules', '.cache', 'dist', '.turbo', '__pycache__']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toContain('node_modules');
        expect(result.detectedFolders).toContain('.cache');
        expect(result.detectedFolders).toContain('dist');
        expect(result.detectedFolders).toContain('.turbo');
        expect(result.detectedFolders).toContain('__pycache__');
    });
    it('returns empty array when no known generated folders exist', async () => {
        mockRootFiles(['src', 'tests', 'docs', 'README.md']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toHaveLength(0);
    });
    it('does not detect custom project folders as generated', async () => {
        mockRootFiles(['my-app', 'components', 'pages', 'styles']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toHaveLength(0);
    });
    it('detects .dart_tool for Flutter projects', async () => {
        mockRootFiles(['.dart_tool', 'lib', 'pubspec.yaml']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toContain('.dart_tool');
    });
    it('detects .gradle for Java projects', async () => {
        mockRootFiles(['.gradle', 'src', 'build.gradle']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toContain('.gradle');
    });
    it('detects target/ for Java/Rust projects', async () => {
        mockRootFiles(['target', 'src', 'Cargo.toml']);
        const result = await scanner.scan(ROOT);
        expect(result.detectedFolders).toContain('target');
    });
    it('handles readDirectory failure gracefully', async () => {
        vscode.workspace.fs.readDirectory.mockRejectedValue(new Error('Permission denied'));
        await expect(scanner.scan(ROOT)).resolves.toBeDefined();
    });
});
//# sourceMappingURL=folderScanner.test.js.map