import * as vscode from 'vscode';
import { FolderScanner } from '../../scanner/folderScanner';

function mockRootFiles(names: string[]) {
  (vscode.workspace.fs.readDirectory as jest.Mock).mockResolvedValue(
    names.map(n => [n, vscode.FileType.Directory])
  );
}

const ROOT = '/workspace';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('FolderScanner', () => {
  let scanner: FolderScanner;

  beforeEach(() => {
    scanner = new FolderScanner();
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
    (vscode.workspace.fs.readDirectory as jest.Mock).mockRejectedValue(new Error('Permission denied'));
    await expect(scanner.scan(ROOT)).resolves.toBeDefined();
  });
});
