import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class GoDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detected = rootFiles.includes('go.mod');

    return {
      detected,
      technology: 'Go',
      category: CATEGORIES.GO,
      confidence: detected ? 'high' : 'low',
    };
  }
}
