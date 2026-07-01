"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeRules = getNodeRules;
const constants_1 = require("../utils/constants");
function getNodeRules() {
    return [
        {
            category: constants_1.CATEGORIES.NODE,
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
            category: constants_1.CATEGORIES.BUILD,
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
            category: constants_1.CATEGORIES.CACHE,
            comment: '# Node cache',
            rules: [
                '.eslintcache',
                '.stylelintcache',
                '.cache/',
            ],
        },
    ];
}
//# sourceMappingURL=node.template.js.map