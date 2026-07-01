import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class LaravelDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detected = rootFiles.includes('composer.json') && rootFiles.includes('artisan');

    return {
      detected,
      technology: 'Laravel',
      category: CATEGORIES.LARAVEL,
      confidence: detected ? 'high' : 'low',
    };
  }
}
