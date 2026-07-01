import { Logger } from '../utils/logger';

export class DuplicateCleaner {
  clean(content: string): { cleaned: string; removedCount: number } {
    const lines = content.split('\n');
    const seen = new Set<string>();
    const result: string[] = [];
    let removedCount = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      // Always keep comments and blank lines
      if (trimmed === '' || trimmed.startsWith('#')) {
        result.push(line);
        continue;
      }

      if (seen.has(trimmed)) {
        removedCount++;
        Logger.debug(`Removed duplicate: ${trimmed}`);
      } else {
        seen.add(trimmed);
        result.push(line);
      }
    }

    return { cleaned: result.join('\n'), removedCount };
  }

  extractExistingRules(content: string): Set<string> {
    const rules = new Set<string>();
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        rules.add(trimmed);
      }
    }

    return rules;
  }

  extractExistingComments(content: string): string[] {
    return content
      .split('\n')
      .filter(l => l.trim().startsWith('#'))
      .map(l => l.trim());
  }
}
