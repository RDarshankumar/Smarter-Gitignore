import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class DockerDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detected =
      rootFiles.includes('Dockerfile') ||
      rootFiles.includes('docker-compose.yml') ||
      rootFiles.includes('docker-compose.yaml') ||
      rootFiles.some(f => f.startsWith('Dockerfile.'));

    return {
      detected,
      technology: 'Docker',
      category: CATEGORIES.DOCKER,
      confidence: detected ? 'high' : 'low',
    };
  }
}
