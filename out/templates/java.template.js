"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJavaRules = getJavaRules;
exports.getLaravelRules = getLaravelRules;
exports.getDotnetRules = getDotnetRules;
exports.getRustRules = getRustRules;
exports.getGoRules = getGoRules;
exports.getDockerRules = getDockerRules;
const constants_1 = require("../utils/constants");
function getJavaRules() {
    return [
        {
            category: constants_1.CATEGORIES.JAVA,
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
function getLaravelRules() {
    return [
        {
            category: constants_1.CATEGORIES.LARAVEL,
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
function getDotnetRules() {
    return [
        {
            category: constants_1.CATEGORIES.DOTNET,
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
function getRustRules() {
    return [
        {
            category: constants_1.CATEGORIES.RUST,
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
function getGoRules() {
    return [
        {
            category: constants_1.CATEGORIES.GO,
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
function getDockerRules() {
    return [
        {
            category: constants_1.CATEGORIES.DOCKER,
            comment: '# Docker',
            rules: [
                '.dockerignore',
                'docker-compose.override.yml',
            ],
        },
    ];
}
//# sourceMappingURL=java.template.js.map