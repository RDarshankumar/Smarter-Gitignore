"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReactRules = getReactRules;
exports.getNextRules = getNextRules;
exports.getAngularRules = getAngularRules;
exports.getVueRules = getVueRules;
const constants_1 = require("../utils/constants");
function getReactRules() {
    return [
        {
            category: constants_1.CATEGORIES.BUILD,
            comment: '# React build',
            rules: [
                'build/',
                'dist/',
                'coverage/',
                '.nyc_output/',
            ],
        },
    ];
}
function getNextRules() {
    return [
        {
            category: constants_1.CATEGORIES.NEXT,
            comment: '# Next.js',
            rules: [
                '.next/',
                'out/',
                '.vercel',
                'next-env.d.ts',
            ],
        },
    ];
}
function getAngularRules() {
    return [
        {
            category: constants_1.CATEGORIES.ANGULAR,
            comment: '# Angular',
            rules: [
                '.angular/',
                'dist/',
                'tmp/',
                'out-tsc/',
                'bazel-out/',
                '.sass-cache/',
                'connect.lock',
                'coverage/',
                'libpeerconnection.log',
                'testem.log',
            ],
        },
    ];
}
function getVueRules() {
    return [
        {
            category: constants_1.CATEGORIES.VUE,
            comment: '# Vue.js',
            rules: [
                'dist/',
                '.nuxt/',
                '.output/',
                '.vuepress/dist',
                '.temp',
                '.cache',
            ],
        },
    ];
}
//# sourceMappingURL=react.template.js.map