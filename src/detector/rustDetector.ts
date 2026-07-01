import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class RustDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detected = rootFiles.includes('Cargo.toml');

    return {
      detected,
      technology: 'Rust',
      category: CATEGORIES.RUST,
      confidence: detected ? 'high' : 'low',
    };
  }
}
