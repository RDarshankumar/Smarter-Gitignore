import { CATEGORIES, GITIGNORE_FILE, LARGE_FILE_THRESHOLD_MB } from '../../utils/constants';

describe('constants', () => {
  it('GITIGNORE_FILE is .gitignore', () => {
    expect(GITIGNORE_FILE).toBe('.gitignore');
  });

  it('LARGE_FILE_THRESHOLD_MB is 50', () => {
    expect(LARGE_FILE_THRESHOLD_MB).toBe(50);
  });

  it('CATEGORIES contains all expected keys', () => {
    const expected = [
      'COMMON', 'NODE', 'REACT', 'NEXT', 'ANGULAR', 'VUE',
      'FLUTTER', 'PYTHON', 'JAVA', 'GO', 'RUST', 'DOTNET',
      'DOCKER', 'LARAVEL', 'SECRETS', 'LOGS', 'DATABASE',
      'CACHE', 'IDE', 'BUILD', 'MEDIA', 'OS',
    ];
    for (const key of expected) {
      expect(CATEGORIES).toHaveProperty(key);
    }
  });

  it('CATEGORIES values are non-empty strings', () => {
    for (const value of Object.values(CATEGORIES)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});
