import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class DotnetDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const detected =
      rootFiles.some(f => f.endsWith('.csproj') || f.endsWith('.sln') || f.endsWith('.fsproj')) ||
      rootFiles.includes('global.json');

    return {
      detected,
      technology: '.NET',
      category: CATEGORIES.DOTNET,
      confidence: detected ? 'high' : 'low',
    };
  }
}
