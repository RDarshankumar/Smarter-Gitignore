import * as vscode from 'vscode';
import { DetectionResult, IgnoreGroup } from '../detector/technologyDetector';
import { CATEGORIES } from '../utils/constants';
import { getCommonRules } from '../templates/common.template';
import { getNodeRules } from '../templates/node.template';
import {
  getReactRules,
  getNextRules,
  getAngularRules,
  getVueRules,
} from '../templates/react.template';
import { getFlutterRules } from '../templates/flutter.template';
import { getPythonRules } from '../templates/python.template';
import {
  getJavaRules,
  getLaravelRules,
  getDotnetRules,
  getRustRules,
  getGoRules,
  getDockerRules,
} from '../templates/java.template';

export class RuleBuilder {
  build(detectedTechnologies: DetectionResult[]): IgnoreGroup[] {
    const config = vscode.workspace.getConfiguration('smartGitIgnore');
    const detectSecrets = config.get<boolean>('detectSecrets', true);
    const detectLogs = config.get<boolean>('detectLogs', true);
    const detectDb = config.get<boolean>('detectDatabaseFiles', true);

    const groups: IgnoreGroup[] = [];
    const techNames = detectedTechnologies.map(t => t.technology);

    // Always include common rules
    const commonGroups = getCommonRules();

    for (const group of commonGroups) {
      if (group.category === CATEGORIES.SECRETS && !detectSecrets) continue;
      if (group.category === CATEGORIES.LOGS && !detectLogs) continue;
      if (group.category === CATEGORIES.DATABASE && !detectDb) continue;
      groups.push(group);
    }

    // Tech-specific rules
    if (techNames.includes('Node.js')) {
      groups.push(...getNodeRules());
    }
    if (techNames.includes('React')) {
      groups.push(...getReactRules());
    }
    if (techNames.includes('Next.js')) {
      groups.push(...getNextRules());
    }
    if (techNames.includes('Angular')) {
      groups.push(...getAngularRules());
    }
    if (techNames.includes('Vue')) {
      groups.push(...getVueRules());
    }
    if (techNames.includes('Flutter/Dart')) {
      groups.push(...getFlutterRules());
    }
    if (techNames.includes('Python')) {
      groups.push(...getPythonRules());
    }
    if (techNames.includes('Java')) {
      groups.push(...getJavaRules());
    }
    if (techNames.includes('Laravel')) {
      groups.push(...getLaravelRules());
    }
    if (techNames.includes('.NET')) {
      groups.push(...getDotnetRules());
    }
    if (techNames.includes('Rust')) {
      groups.push(...getRustRules());
    }
    if (techNames.includes('Go')) {
      groups.push(...getGoRules());
    }
    if (techNames.includes('Docker')) {
      groups.push(...getDockerRules());
    }

    return this.deduplicateGroups(groups);
  }

  private deduplicateGroups(groups: IgnoreGroup[]): IgnoreGroup[] {
    const seen = new Set<string>();
    return groups.map(group => ({
      ...group,
      rules: group.rules.filter(rule => {
        if (seen.has(rule)) return false;
        seen.add(rule);
        return true;
      }),
    })).filter(g => g.rules.length > 0);
  }
}
