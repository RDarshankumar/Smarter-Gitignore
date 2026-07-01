import { IgnoreGroup } from '../detector/technologyDetector';
import { CATEGORIES } from '../utils/constants';

export function getReactRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.BUILD,
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

export function getNextRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.NEXT,
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

export function getAngularRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.ANGULAR,
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

export function getVueRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.VUE,
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
