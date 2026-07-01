import { IgnoreGroup } from '../detector/technologyDetector';
import { CATEGORIES } from '../utils/constants';

export function getFlutterRules(): IgnoreGroup[] {
  return [
    {
      category: CATEGORIES.FLUTTER,
      comment: '# Flutter / Dart',
      rules: [
        '.dart_tool/',
        '.flutter-plugins',
        '.flutter-plugins-dependencies',
        '.packages',
        '.pub-cache/',
        '.pub/',
        'build/',
        '*.g.dart',
        '*.freezed.dart',
        '*.mocks.dart',
        'coverage/',
        'doc/api/',
        '.flutter-plugins',
      ],
    },
  ];
}
