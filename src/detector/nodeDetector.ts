import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class NodeDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const markerFiles = ['package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '.nvmrc', '.node-version'];
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detected = markerFiles.some(m => rootFiles.includes(m));

    return {
      detected,
      technology: 'Node.js',
      category: CATEGORIES.NODE,
      confidence: rootFiles.includes('package.json') ? 'high' : 'medium',
    };
  }
}
