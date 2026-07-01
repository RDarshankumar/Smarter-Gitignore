import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';
import * as path from 'path';

export class NextDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);

    if (rootFiles.includes('next.config.js') || rootFiles.includes('next.config.ts') || rootFiles.includes('next.config.mjs')) {
      return { detected: true, technology: 'Next.js', category: CATEGORIES.NEXT, confidence: 'high' };
    }

    try {
      const pkgContent = await FileUtils.readFile(path.join(workspaceRoot, 'package.json'));
      const pkg = JSON.parse(pkgContent);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const detected = 'next' in deps;

      return { detected, technology: 'Next.js', category: CATEGORIES.NEXT, confidence: detected ? 'high' : 'low' };
    } catch {
      return { detected: false, technology: 'Next.js', category: CATEGORIES.NEXT, confidence: 'low' };
    }
  }
}
