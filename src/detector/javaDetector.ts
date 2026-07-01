import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class JavaDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const markers = ['pom.xml', 'build.gradle', 'build.gradle.kts', 'gradlew', 'mvnw'];
    const detected = markers.some(m => rootFiles.includes(m));

    return {
      detected,
      technology: 'Java',
      category: CATEGORIES.JAVA,
      confidence: rootFiles.includes('pom.xml') || rootFiles.includes('build.gradle') ? 'high' : 'medium',
    };
  }
}
