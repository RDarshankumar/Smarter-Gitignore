import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class FlutterDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detected = rootFiles.includes('pubspec.yaml');

    return {
      detected,
      technology: 'Flutter/Dart',
      category: CATEGORIES.FLUTTER,
      confidence: detected ? 'high' : 'low',
    };
  }
}
