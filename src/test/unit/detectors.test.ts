import * as vscode from 'vscode';
import { NodeDetector } from '../../detector/nodeDetector';
import { ReactDetector } from '../../detector/reactDetector';
import { NextDetector } from '../../detector/nextDetector';
import { AngularDetector } from '../../detector/angularDetector';
import { VueDetector } from '../../detector/vueDetector';
import { FlutterDetector } from '../../detector/flutterDetector';
import { LaravelDetector } from '../../detector/laravelDetector';
import { PythonDetector } from '../../detector/pythonDetector';
import { JavaDetector } from '../../detector/javaDetector';
import { GoDetector } from '../../detector/goDetector';
import { RustDetector } from '../../detector/rustDetector';
import { DotnetDetector } from '../../detector/dotnetDetector';
import { DockerDetector } from '../../detector/dockerDetector';

// Helper to set up the VS Code fs mock to return a specific list of root files
function mockRootFiles(files: string[]) {
  (vscode.workspace.fs.readDirectory as jest.Mock).mockResolvedValue(
    files.map(f => [f, vscode.FileType.File])
  );
}

// Helper to set a package.json body for detectors that read it
function mockPackageJson(content: object) {
  const bytes = Buffer.from(JSON.stringify(content));
  (vscode.workspace.fs.readFile as jest.Mock).mockResolvedValue(bytes);
}

const ROOT = '/fake/workspace';

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── NodeDetector ────────────────────────────────────────────────────────────

describe('NodeDetector', () => {
  const detector = new NodeDetector();

  it('detects when package.json present', async () => {
    mockRootFiles(['package.json', 'src']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.technology).toBe('Node.js');
    expect(result.confidence).toBe('high');
  });

  it('detects when only yarn.lock present', async () => {
    mockRootFiles(['yarn.lock']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects when only pnpm-lock.yaml present', async () => {
    mockRootFiles(['pnpm-lock.yaml']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected when no marker files', async () => {
    mockRootFiles(['main.go', 'go.mod']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── ReactDetector ───────────────────────────────────────────────────────────

describe('ReactDetector', () => {
  const detector = new ReactDetector();

  it('detects when react is in dependencies', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { react: '^18.0.0', 'react-dom': '^18.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('detects when react is in devDependencies', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ devDependencies: { react: '^18.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected when react not in deps', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { express: '^4.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });

  it('returns not detected when no package.json', async () => {
    mockRootFiles(['pubspec.yaml']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── NextDetector ─────────────────────────────────────────────────────────────

describe('NextDetector', () => {
  const detector = new NextDetector();

  it('detects when next.config.js present', async () => {
    mockRootFiles(['next.config.js', 'package.json']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('detects when next.config.ts present', async () => {
    mockRootFiles(['next.config.ts']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects from package.json dependency', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { next: '^14.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected for pure React without Next', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { react: '^18.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── AngularDetector ─────────────────────────────────────────────────────────

describe('AngularDetector', () => {
  const detector = new AngularDetector();

  it('detects when angular.json present', async () => {
    mockRootFiles(['angular.json']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects from @angular/core in deps', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { '@angular/core': '^17.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected for Vue project', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { vue: '^3.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── VueDetector ─────────────────────────────────────────────────────────────

describe('VueDetector', () => {
  const detector = new VueDetector();

  it('detects from vue in package.json dependencies', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { vue: '^3.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected when vue not in deps', async () => {
    mockRootFiles(['package.json']);
    mockPackageJson({ dependencies: { react: '^18.0.0' } });
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── FlutterDetector ─────────────────────────────────────────────────────────

describe('FlutterDetector', () => {
  const detector = new FlutterDetector();

  it('detects when pubspec.yaml present', async () => {
    mockRootFiles(['pubspec.yaml', 'lib']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.technology).toBe('Flutter/Dart');
    expect(result.confidence).toBe('high');
  });

  it('returns not detected when pubspec.yaml missing', async () => {
    mockRootFiles(['package.json']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── LaravelDetector ─────────────────────────────────────────────────────────

describe('LaravelDetector', () => {
  const detector = new LaravelDetector();

  it('detects when composer.json AND artisan present', async () => {
    mockRootFiles(['composer.json', 'artisan', 'app']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('returns not detected when only composer.json (no artisan)', async () => {
    mockRootFiles(['composer.json']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── PythonDetector ──────────────────────────────────────────────────────────

describe('PythonDetector', () => {
  const detector = new PythonDetector();

  it('detects when requirements.txt present', async () => {
    mockRootFiles(['requirements.txt', 'main.py']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.technology).toBe('Python');
  });

  it('detects when pyproject.toml present', async () => {
    mockRootFiles(['pyproject.toml']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects when Pipfile present', async () => {
    mockRootFiles(['Pipfile', 'Pipfile.lock']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects when setup.py present', async () => {
    mockRootFiles(['setup.py']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected for Node project', async () => {
    mockRootFiles(['package.json', 'node_modules']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── JavaDetector ────────────────────────────────────────────────────────────

describe('JavaDetector', () => {
  const detector = new JavaDetector();

  it('detects when pom.xml present', async () => {
    mockRootFiles(['pom.xml', 'src']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('detects when build.gradle present', async () => {
    mockRootFiles(['build.gradle']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('detects when gradlew present', async () => {
    mockRootFiles(['gradlew', 'settings.gradle']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected for Go project', async () => {
    mockRootFiles(['go.mod', 'main.go']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── GoDetector ──────────────────────────────────────────────────────────────

describe('GoDetector', () => {
  const detector = new GoDetector();

  it('detects when go.mod present', async () => {
    mockRootFiles(['go.mod', 'main.go']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('returns not detected without go.mod', async () => {
    mockRootFiles(['main.go']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── RustDetector ────────────────────────────────────────────────────────────

describe('RustDetector', () => {
  const detector = new RustDetector();

  it('detects when Cargo.toml present', async () => {
    mockRootFiles(['Cargo.toml', 'src']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('returns not detected without Cargo.toml', async () => {
    mockRootFiles(['package.json']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── DotnetDetector ──────────────────────────────────────────────────────────

describe('DotnetDetector', () => {
  const detector = new DotnetDetector();

  it('detects when .csproj file present', async () => {
    mockRootFiles(['MyApp.csproj', 'Program.cs']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects when .sln file present', async () => {
    mockRootFiles(['MySolution.sln']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects when global.json present', async () => {
    mockRootFiles(['global.json']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected for Python project', async () => {
    mockRootFiles(['requirements.txt', 'main.py']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});

// ─── DockerDetector ──────────────────────────────────────────────────────────

describe('DockerDetector', () => {
  const detector = new DockerDetector();

  it('detects when Dockerfile present', async () => {
    mockRootFiles(['Dockerfile', 'package.json']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('high');
  });

  it('detects when docker-compose.yml present', async () => {
    mockRootFiles(['docker-compose.yml']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('detects when docker-compose.yaml present', async () => {
    mockRootFiles(['docker-compose.yaml']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(true);
  });

  it('returns not detected for plain Node project', async () => {
    mockRootFiles(['package.json', 'src']);
    const result = await detector.detect([], ROOT);
    expect(result.detected).toBe(false);
  });
});
