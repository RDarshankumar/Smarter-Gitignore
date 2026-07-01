import { Category } from '../utils/constants';

export interface DetectionResult {
  detected: boolean;
  technology: string;
  category: Category;
  confidence: 'high' | 'medium' | 'low';
}

export interface IDetector {
  detect(files: string[], workspaceRoot: string): Promise<DetectionResult>;
}

export interface IgnoreGroup {
  category: Category;
  comment: string;
  rules: string[];
}
