"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonRules = getCommonRules;
const constants_1 = require("../utils/constants");
function getCommonRules() {
    return [
        {
            category: constants_1.CATEGORIES.OS,
            comment: '# OS generated files',
            rules: [
                '.DS_Store',
                '.DS_Store?',
                '._*',
                '.Spotlight-V100',
                '.Trashes',
                'ehthumbs.db',
                'Thumbs.db',
                'desktop.ini',
            ],
        },
        {
            category: constants_1.CATEGORIES.IDE,
            comment: '# IDE and Editor files',
            rules: [
                '.idea/',
                '.vscode/',
                '*.swp',
                '*.swo',
                '*~',
                '.project',
                '.classpath',
                '.settings/',
                '*.suo',
                '*.user',
                '*.userosscache',
                '*.sln.docstates',
                '.vs/',
            ],
        },
        {
            category: constants_1.CATEGORIES.SECRETS,
            comment: '# Secrets and credentials',
            rules: [
                '.env',
                '.env.local',
                '.env.development',
                '.env.development.local',
                '.env.test',
                '.env.test.local',
                '.env.production',
                '.env.production.local',
                '.env.staging',
                '*.pem',
                '*.key',
                '*.crt',
                '*.p12',
                '*.jks',
                'firebase-admin.json',
                'google-services.json',
                'GoogleService-Info.plist',
                'serviceAccount.json',
                '*secret*',
                '*credential*',
                'auth.json',
            ],
        },
        {
            category: constants_1.CATEGORIES.LOGS,
            comment: '# Logs',
            rules: [
                '*.log',
                'logs/',
                'log/',
                'npm-debug.log*',
                'yarn-debug.log*',
                'yarn-error.log*',
                'pnpm-debug.log*',
                'lerna-debug.log*',
                '.pnpm-debug.log*',
            ],
        },
        {
            category: constants_1.CATEGORIES.DATABASE,
            comment: '# Database files',
            rules: [
                '*.sqlite',
                '*.sqlite3',
                '*.db',
                '*.db3',
                '*.s3db',
                '*.sl3',
            ],
        },
        {
            category: constants_1.CATEGORIES.CACHE,
            comment: '# Cache directories',
            rules: [
                '.cache/',
                '.parcel-cache/',
                '.turbo/',
                '.vercel/',
                '.firebase/',
                '.netlify/',
            ],
        },
    ];
}
//# sourceMappingURL=common.template.js.map