import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';
import * as path from 'path';

export class VueDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);

    if (rootFiles.includes('vue.config.js') || rootFiles.includes('vite.config.ts')) {
      try {
        const content = await FileUtils.readFile(
          path.join(workspaceRoot, rootFiles.includes('vue.config.js') ? 'vue.config.js' : 'vite.config.ts')
        );
        if (content.includes('vue')) {
          return { detected: true, technology: 'Vue', category: CATEGORIES.VUE, confidence: 'high' };
        }
      } catch { /* ignore */ }
    }

    try {
      const pkgContent = await FileUtils.readFile(path.join(workspaceRoot, 'package.json'));
      const pkg = JSON.parse(pkgContent);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const detected = 'vue' in deps;

      return { detected, technology: 'Vue', category: CATEGORIES.VUE, confidence: detected ? 'high' : 'low' };
    } catch {
      return { detected: false, technology: 'Vue', category: CATEGORIES.VUE, confidence: 'low' };
    }
  }
}
