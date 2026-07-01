export const EXTENSION_NAME = 'Smart GitIgnore';
export const EXTENSION_ID = 'smartGitIgnore';
export const GITIGNORE_FILE = '.gitignore';
export const DOCKERIGNORE_FILE = '.dockerignore';
export const NPMIGNORE_FILE = '.npmignore';

export const LARGE_FILE_THRESHOLD_MB = 50;

export const SECTION_SEPARATOR = '\n';

export const CATEGORIES = {
  COMMON: 'Common',
  NODE: 'Node',
  REACT: 'React',
  NEXT: 'Next.js',
  ANGULAR: 'Angular',
  VUE: 'Vue',
  FLUTTER: 'Flutter',
  PYTHON: 'Python',
  JAVA: 'Java',
  GO: 'Go',
  RUST: 'Rust',
  DOTNET: '.NET',
  DOCKER: 'Docker',
  LARAVEL: 'Laravel',
  SECRETS: 'Secrets',
  LOGS: 'Logs',
  DATABASE: 'Database',
  CACHE: 'Cache',
  IDE: 'IDE',
  BUILD: 'Build',
  MEDIA: 'Media',
  OS: 'OS',
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
