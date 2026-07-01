import { IDetector, DetectionResult } from './technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { FileUtils } from '../utils/fileUtils';

export class PythonDetector implements IDetector {
  async detect(files: string[], workspaceRoot: string): Promise<DetectionResult> {
    const rootFiles = await FileUtils.listFiles(workspaceRoot);
    const markers = ['requirements.txt', 'setup.py', 'setup.cfg', 'pyproject.toml', 'Pipfile', 'poetry.lock'];
    const detected = markers.some(m => rootFiles.includes(m));

    return {
      detected,
      technology: 'Python',
      category: CATEGORIES.PYTHON,
      confidence: detected ? 'high' : 'low',
    };
  }
}
