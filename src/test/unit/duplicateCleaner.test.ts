import { DuplicateCleaner } from '../../updater/duplicateCleaner';

describe('DuplicateCleaner', () => {
  let cleaner: DuplicateCleaner;

  beforeEach(() => {
    cleaner = new DuplicateCleaner();
  });

  // ─── clean() ────────────────────────────────────────────────────────────────

  describe('clean()', () => {
    it('removes exact duplicate lines', () => {
      const input = 'node_modules/\nnode_modules/\ndist/\n';
      const { cleaned, removedCount } = cleaner.clean(input);
      expect(removedCount).toBe(1);
      expect(cleaned).not.toMatch(/node_modules\/\n.*node_modules\//s);
    });

    it('keeps blank lines as-is', () => {
      const input = 'node_modules/\n\ndist/\n\nbuild/\n';
      const { cleaned, removedCount } = cleaner.clean(input);
      expect(removedCount).toBe(0);
      expect(cleaned).toBe(input);
    });

    it('keeps comment lines always', () => {
      const input = '# Node\nnode_modules/\n# Node\nnode_modules/\n';
      const { cleaned, removedCount } = cleaner.clean(input);
      expect(removedCount).toBe(1);
      expect(cleaned).toContain('# Node');
    });

    it('returns 0 removed when no duplicates exist', () => {
      const input = 'node_modules/\ndist/\nbuild/\n';
      const { removedCount } = cleaner.clean(input);
      expect(removedCount).toBe(0);
    });

    it('handles empty string', () => {
      const { cleaned, removedCount } = cleaner.clean('');
      expect(removedCount).toBe(0);
      expect(cleaned).toBe('');
    });

    it('removes multiple different duplicates', () => {
      const input = 'a\nb\na\nc\nb\nd\n';
      const { removedCount } = cleaner.clean(input);
      expect(removedCount).toBe(2);
    });

    it('treats lines with leading/trailing spaces as different entries', () => {
      // trimmed comparison — '  node_modules/' trims to 'node_modules/'
      const input = 'node_modules/\n  node_modules/\n';
      const { removedCount } = cleaner.clean(input);
      expect(removedCount).toBe(1);
    });
  });

  // ─── extractExistingRules() ──────────────────────────────────────────────────

  describe('extractExistingRules()', () => {
    it('returns a set of non-comment, non-blank lines', () => {
      const content = '# Node\nnode_modules/\n\ndist/\n';
      const rules = cleaner.extractExistingRules(content);
      expect(rules.has('node_modules/')).toBe(true);
      expect(rules.has('dist/')).toBe(true);
      expect(rules.has('# Node')).toBe(false);
    });

    it('ignores blank lines', () => {
      const content = '\n\nnode_modules/\n\n';
      const rules = cleaner.extractExistingRules(content);
      expect(rules.size).toBe(1);
    });

    it('returns empty set for comment-only content', () => {
      const content = '# Section\n# Another section\n';
      const rules = cleaner.extractExistingRules(content);
      expect(rules.size).toBe(0);
    });

    it('returns empty set for empty string', () => {
      const rules = cleaner.extractExistingRules('');
      expect(rules.size).toBe(0);
    });
  });

  // ─── extractExistingComments() ───────────────────────────────────────────────

  describe('extractExistingComments()', () => {
    it('extracts all comment lines', () => {
      const content = '# Node\nnode_modules/\n# Logs\n*.log\n';
      const comments = cleaner.extractExistingComments(content);
      expect(comments).toContain('# Node');
      expect(comments).toContain('# Logs');
      expect(comments).toHaveLength(2);
    });

    it('returns empty array when no comments exist', () => {
      const content = 'node_modules/\ndist/\n';
      const comments = cleaner.extractExistingComments(content);
      expect(comments).toHaveLength(0);
    });
  });
});
