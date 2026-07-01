"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlutterRules = getFlutterRules;
const constants_1 = require("../utils/constants");
function getFlutterRules() {
    return [
        {
            category: constants_1.CATEGORIES.FLUTTER,
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
//# sourceMappingURL=flutter.template.js.map