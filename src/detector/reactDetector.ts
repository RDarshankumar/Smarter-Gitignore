import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';
import * as path from 'path';

export class ReactDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);

    if (!rootFiles.includes('package.json')) {
      return { detected: false, technology: 'React', category: CATEGORIES.REACT, confidence: 'low' };
    }

    try {
      const pkgContent = await FileUtils.readFile(path.join(workspaceRoot, 'package.json'));
      const pkg = JSON.parse(pkgContent);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const detected = 'react' in deps || 'react-dom' in deps;

      return {
        detected,
        technology: 'React',
        category: CATEGORIES.REACT,
        confidence: detected ? 'high' : 'low',
      };
    } catch {
      return { detected: false, technology: 'React', category: CATEGORIES.REACT, confidence: 'low' };
    }
  }
}
