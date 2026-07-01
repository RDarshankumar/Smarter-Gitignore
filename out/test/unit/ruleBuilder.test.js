"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ruleBuilder_1 = require("../../scanner/ruleBuilder");
const constants_1 = require("../../utils/constants");
const vscode = __importStar(require("vscode"));
function makeDetection(technology, category) {
    return { detected: true, technology, category, confidence: 'high' };
}
// Default mock: all settings enabled
beforeEach(() => {
    vscode.workspace.getConfiguration.mockReturnValue({
        get: (key, def) => {
            const overrides = {
                detectSecrets: true,
                detectLogs: true,
                detectDatabaseFiles: true,
                groupRules: true,
                sortRules: true,
            };
            return key in overrides ? overrides[key] : def;
        },
    });
});
describe('RuleBuilder', () => {
    let builder;
    beforeEach(() => {
        builder = new ruleBuilder_1.RuleBuilder();
    });
    it('always includes common (OS, IDE, secrets, logs, db, cache) groups', () => {
        const groups = builder.build([]);
        const categories = groups.map(g => g.category);
        expect(categories).toContain(constants_1.CATEGORIES.OS);
        expect(categories).toContain(constants_1.CATEGORIES.IDE);
        expect(categories).toContain(constants_1.CATEGORIES.SECRETS);
        expect(categories).toContain(constants_1.CATEGORIES.LOGS);
        expect(categories).toContain(constants_1.CATEGORIES.DATABASE);
        expect(categories).toContain(constants_1.CATEGORIES.CACHE);
    });
    it('includes Node rules when Node.js detected', () => {
        const groups = builder.build([makeDetection('Node.js', constants_1.CATEGORIES.NODE)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('node_modules/');
    });
    it('includes React rules when React detected', () => {
        const groups = builder.build([makeDetection('React', constants_1.CATEGORIES.REACT)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('coverage/');
    });
    it('includes .next/ when Next.js detected', () => {
        const groups = builder.build([makeDetection('Next.js', constants_1.CATEGORIES.NEXT)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('.next/');
    });
    it('includes .angular/ when Angular detected', () => {
        const groups = builder.build([makeDetection('Angular', constants_1.CATEGORIES.ANGULAR)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('.angular/');
    });
    it('includes .nuxt/ when Vue detected', () => {
        const groups = builder.build([makeDetection('Vue', constants_1.CATEGORIES.VUE)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('.nuxt/');
    });
    it('includes .dart_tool/ when Flutter detected', () => {
        const groups = builder.build([makeDetection('Flutter/Dart', constants_1.CATEGORIES.FLUTTER)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('.dart_tool/');
    });
    it('includes __pycache__/ when Python detected', () => {
        const groups = builder.build([makeDetection('Python', constants_1.CATEGORIES.PYTHON)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('__pycache__/');
    });
    it('includes target/ when Java detected', () => {
        const groups = builder.build([makeDetection('Java', constants_1.CATEGORIES.JAVA)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('target/');
    });
    it('includes vendor/ when Laravel detected', () => {
        const groups = builder.build([makeDetection('Laravel', constants_1.CATEGORIES.LARAVEL)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('vendor/');
    });
    it('includes target/ when Rust detected', () => {
        const groups = builder.build([makeDetection('Rust', constants_1.CATEGORIES.RUST)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('target/');
    });
    it('includes bin/ when Go detected', () => {
        const groups = builder.build([makeDetection('Go', constants_1.CATEGORIES.GO)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('bin/');
    });
    it('includes bin/ when .NET detected', () => {
        const groups = builder.build([makeDetection('.NET', constants_1.CATEGORIES.DOTNET)]);
        const allRules = groups.flatMap(g => g.rules);
        expect(allRules).toContain('bin/');
    });
    it('produces no duplicate rules across all technologies', () => {
        const allDetections = [
            makeDetection('Node.js', constants_1.CATEGORIES.NODE),
            makeDetection('React', constants_1.CATEGORIES.REACT),
            makeDetection('Next.js', constants_1.CATEGORIES.NEXT),
            makeDetection('Angular', constants_1.CATEGORIES.ANGULAR),
            makeDetection('Vue', constants_1.CATEGORIES.VUE),
            makeDetection('Flutter/Dart', constants_1.CATEGORIES.FLUTTER),
            makeDetection('Python', constants_1.CATEGORIES.PYTHON),
            makeDetection('Java', constants_1.CATEGORIES.JAVA),
            makeDetection('Laravel', constants_1.CATEGORIES.LARAVEL),
            makeDetection('Go', constants_1.CATEGORIES.GO),
            makeDetection('Rust', constants_1.CATEGORIES.RUST),
            makeDetection('.NET', constants_1.CATEGORIES.DOTNET),
            makeDetection('Docker', constants_1.CATEGORIES.DOCKER),
        ];
        const groups = builder.build(allDetections);
        const allRules = groups.flatMap(g => g.rules);
        const uniqueRules = new Set(allRules);
        expect(allRules.length).toBe(uniqueRules.size);
    });
    it('omits secrets group when detectSecrets is false', () => {
        vscode.workspace.getConfiguration.mockReturnValue({
            get: (key, def) => key === 'detectSecrets' ? false : def,
        });
        const groups = builder.build([]);
        const categories = groups.map(g => g.category);
        expect(categories).not.toContain(constants_1.CATEGORIES.SECRETS);
    });
    it('omits logs group when detectLogs is false', () => {
        vscode.workspace.getConfiguration.mockReturnValue({
            get: (key, def) => key === 'detectLogs' ? false : def,
        });
        const groups = builder.build([]);
        const categories = groups.map(g => g.category);
        expect(categories).not.toContain(constants_1.CATEGORIES.LOGS);
    });
    it('omits database group when detectDatabaseFiles is false', () => {
        vscode.workspace.getConfiguration.mockReturnValue({
            get: (key, def) => key === 'detectDatabaseFiles' ? false : def,
        });
        const groups = builder.build([]);
        const categories = groups.map(g => g.category);
        expect(categories).not.toContain(constants_1.CATEGORIES.DATABASE);
    });
    it('returns empty rules array for empty detection list (no crash)', () => {
        expect(() => builder.build([])).not.toThrow();
    });
});
//# sourceMappingURL=ruleBuilder.test.js.map