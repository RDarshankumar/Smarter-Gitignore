import { IgnoreGroup } from '../detector/technologyDetector';
import { CATEGORIES } from '../utils/constants';

export function getNodeRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.NODE,
      comment: '# Node.js',
      rules: [
        'node_modules/',
        'npm-debug.log*',
        'yarn-debug.log*',
        'yarn-error.log*',
        'pnpm-debug.log*',
        '.npm',
        '.yarn-integrity',
        '.yarn/cache',
        '.yarn/unplugged',
        '.yarn/build-state.yml',
        '.yarn/install-state.gz',
        '.pnp.*',
      ],
    },
    {
      category: CATEGORIES.BUILD,
      comment: '# Build output',
      rules: [
        'dist/',
        'build/',
        'out/',
        'lib/',
        '*.tsbuildinfo',
        '.tsbuildinfo',
      ],
    },
    {
      category: CATEGORIES.CACHE,
      comment: '# Node cache',
      rules: [
        '.eslintcache',
        '.stylelintcache',
        '.cache/',
      ],
    },
  ];
}
