import { IgnoreGroup } from '../detector/technologyDetector';
import { CATEGORIES } from '../utils/constants';

export function getJavaRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.JAVA,
      comment: '# Java / Maven / Gradle',
      rules: [
        '*.class',
        '*.log',
        '*.ctxt',
        '.mtj.tmp/',
        '*.jar',
        '*.war',
        '*.nar',
        '*.ear',
        '*.zip',
        '*.tar.gz',
        '*.rar',
        'hs_err_pid*',
        'replay_pid*',
        'target/',
        '.gradle/',
        'build/',
        '.settings/',
        '.classpath',
        '.project',
        'bin/',
        'out/',
        '.factorypath',
      ],
    },
  ];
}

export function getLaravelRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.LARAVEL,
      comment: '# Laravel / PHP',
      rules: [
        'vendor/',
        '.env',
        '.env.backup',
        '.phpunit.result.cache',
        'Homestead.json',
        'Homestead.yaml',
        'auth.json',
        'npm-debug.log',
        'yarn-error.log',
        'storage/app/public',
        'storage/framework/cache/data',
        'storage/framework/sessions',
        'storage/framework/testing',
        'storage/framework/views',
        'storage/logs',
        'bootstrap/cache',
        '*.sqlite',
        '*.sqlite-wal',
        '*.sqlite-shm',
        '/public/hot',
        '/public/storage',
        '/storage/*.key',
      ],
    },
  ];
}

export function getDotnetRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.DOTNET,
      comment: '# .NET / C#',
      rules: [
        'bin/',
        'obj/',
        '*.user',
        '*.suo',
        '*.userosscache',
        '*.sln.docstates',
        '.vs/',
        'packages/',
        '*.nupkg',
        '*.snupkg',
        '**/[Dd]ebug/',
        '**/[Dd]ebugPublic/',
        '**/[Rr]elease/',
        '**/[Rr]eleases/',
        '**/x64/',
        '**/x86/',
        '**/[Ww][Ii][Nn]32/',
        '**/[Aa][Rr][Mm]/',
        '**/[Aa][Rr][Mm]64/',
        '**/bld/',
        '**/[Bb]in/',
        '**/[Oo]bj/',
        '**/[Ll]og/',
        '**/[Ll]ogs/',
        '.nuget/',
        'TestResults/',
        'coverage/',
        '*.coverage',
        '*.coveragexml',
        '_ReSharper*/',
        '*.[Rr]e[Ss]harper',
        '*.DotSettings.user',
      ],
    },
  ];
}

export function getRustRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.RUST,
      comment: '# Rust',
      rules: [
        'target/',
        'Cargo.lock',
        '**/*.rs.bk',
        '*.pdb',
      ],
    },
  ];
}

export function getGoRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.GO,
      comment: '# Go',
      rules: [
        'vendor/',
        '*.exe',
        '*.exe~',
        '*.dll',
        '*.so',
        '*.dylib',
        '*.test',
        '*.out',
        'go.sum',
        'bin/',
      ],
    },
  ];
}

export function getDockerRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.DOCKER,
      comment: '# Docker',
      rules: [
        '.dockerignore',
        'docker-compose.override.yml',
      ],
    },
  ];
}
