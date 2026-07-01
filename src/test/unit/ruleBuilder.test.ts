import { RuleBuilder } from '../../scanner/ruleBuilder';
import { DetectionResult } from '../../detector/technologyDetector';
import { CATEGORIES } from '../../utils/constants';
import * as vscode from 'vscode';

function makeDetection(technology: string, category: typeof CATEGORIES[keyof typeof CATEGORIES]): DetectionResult {
  return { detected: true, technology, category, confidence: 'high' };
}

// Default mock: all settings enabled
beforeEach(() => {
  (vscode.workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: (key: string, def: unknown) => {
      const overrides: Record<string, unknown> = {
        detectSecrets: true,
        detectLogs: true,
        detectDatabaseFiles: true,
        groupRules: true,
        sortRules: true,
      };
      return key in overrides ? overrides[key] : def;
    },
  });
});

describe('RuleBuilder', () => {
  let builder: RuleBuilder;

  beforeEach(() => {
    builder = new RuleBuilder();
  });

  it('always includes common (OS, IDE, secrets, logs, db, cache) groups', () => {
    const groups = builder.build([]);
    const categories = groups.map(g => g.category);
    expect(categories).toContain(CATEGORIES.OS);
    expect(categories).toContain(CATEGORIES.IDE);
    expect(categories).toContain(CATEGORIES.SECRETS);
    expect(categories).toContain(CATEGORIES.LOGS);
    expect(categories).toContain(CATEGORIES.DATABASE);
    expect(categories).toContain(CATEGORIES.CACHE);
  });

  it('includes Node rules when Node.js detected', () => {
    const groups = builder.build([makeDetection('Node.js', CATEGORIES.NODE)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('node_modules/');
  });

  it('includes React rules when React detected', () => {
    const groups = builder.build([makeDetection('React', CATEGORIES.REACT)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('coverage/');
  });

  it('includes .next/ when Next.js detected', () => {
    const groups = builder.build([makeDetection('Next.js', CATEGORIES.NEXT)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('.next/');
  });

  it('includes .angular/ when Angular detected', () => {
    const groups = builder.build([makeDetection('Angular', CATEGORIES.ANGULAR)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('.angular/');
  });

  it('includes .nuxt/ when Vue detected', () => {
    const groups = builder.build([makeDetection('Vue', CATEGORIES.VUE)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('.nuxt/');
  });

  it('includes .dart_tool/ when Flutter detected', () => {
    const groups = builder.build([makeDetection('Flutter/Dart', CATEGORIES.FLUTTER)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('.dart_tool/');
  });

  it('includes __pycache__/ when Python detected', () => {
    const groups = builder.build([makeDetection('Python', CATEGORIES.PYTHON)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('__pycache__/');
  });

  it('includes target/ when Java detected', () => {
    const groups = builder.build([makeDetection('Java', CATEGORIES.JAVA)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('target/');
  });

  it('includes vendor/ when Laravel detected', () => {
    const groups = builder.build([makeDetection('Laravel', CATEGORIES.LARAVEL)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('vendor/');
  });

  it('includes target/ when Rust detected', () => {
    const groups = builder.build([makeDetection('Rust', CATEGORIES.RUST)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('target/');
  });

  it('includes bin/ when Go detected', () => {
    const groups = builder.build([makeDetection('Go', CATEGORIES.GO)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('bin/');
  });

  it('includes bin/ when .NET detected', () => {
    const groups = builder.build([makeDetection('.NET', CATEGORIES.DOTNET)]);
    const allRules = groups.flatMap(g => g.rules);
    expect(allRules).toContain('bin/');
  });

  it('produces no duplicate rules across all technologies', () => {
    const allDetections = [
      makeDetection('Node.js', CATEGORIES.NODE),
      makeDetection('React', CATEGORIES.REACT),
      makeDetection('Next.js', CATEGORIES.NEXT),
      makeDetection('Angular', CATEGORIES.ANGULAR),
      makeDetection('Vue', CATEGORIES.VUE),
      makeDetection('Flutter/Dart', CATEGORIES.FLUTTER),
      makeDetection('Python', CATEGORIES.PYTHON),
      makeDetection('Java', CATEGORIES.JAVA),
      makeDetection('Laravel', CATEGORIES.LARAVEL),
      makeDetection('Go', CATEGORIES.GO),
      makeDetection('Rust', CATEGORIES.RUST),
      makeDetection('.NET', CATEGORIES.DOTNET),
      makeDetection('Docker', CATEGORIES.DOCKER),
    ];
    const groups = builder.build(allDetections);
    const allRules = groups.flatMap(g => g.rules);
    const uniqueRules = new Set(allRules);
    expect(allRules.length).toBe(uniqueRules.size);
  });

  it('omits secrets group when detectSecrets is false', () => {
    (vscode.workspace.getConfiguration as jest.Mock).mockReturnValue({
      get: (key: string, def: unknown) => key === 'detectSecrets' ? false : def,
    });
    const groups = builder.build([]);
    const categories = groups.map(g => g.category);
    expect(categories).not.toContain(CATEGORIES.SECRETS);
  });

  it('omits logs group when detectLogs is false', () => {
    (vscode.workspace.getConfiguration as jest.Mock).mockReturnValue({
      get: (key: string, def: unknown) => key === 'detectLogs' ? false : def,
    });
    const groups = builder.build([]);
    const categories = groups.map(g => g.category);
    expect(categories).not.toContain(CATEGORIES.LOGS);
  });

  it('omits database group when detectDatabaseFiles is false', () => {
    (vscode.workspace.getConfiguration as jest.Mock).mockReturnValue({
      get: (key: string, def: unknown) => key === 'detectDatabaseFiles' ? false : def,
    });
    const groups = builder.build([]);
    const categories = groups.map(g => g.category);
    expect(categories).not.toContain(CATEGORIES.DATABASE);
  });

  it('returns empty rules array for empty detection list (no crash)', () => {
    expect(() => builder.build([])).not.toThrow();
  });
});
