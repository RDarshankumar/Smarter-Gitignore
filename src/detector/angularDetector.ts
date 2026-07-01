import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';
import * as path from 'path';

export class AngularDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);

    if (rootFiles.includes('angular.json') || rootFiles.includes('.angular')) {
      return { detected: true, technology: 'Angular', category: CATEGORIES.ANGULAR, confidence: 'high' };
    }

    try {
      const pkgContent = await FileUtils.readFile(path.join(workspaceRoot, 'package.json'));
      const pkg = JSON.parse(pkgContent);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const detected = '@angular/core' in deps;

      return { detected, technology: 'Angular', category: CATEGORIES.ANGULAR, confidence: detected ? 'high' : 'low' };
    } catch {
      return { detected: false, technology: 'Angular', category: CATEGORIES.ANGULAR, confidence: 'low' };
    }
  }
}
