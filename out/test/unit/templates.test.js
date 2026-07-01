"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_template_1 = require("../../templates/common.template");
const node_template_1 = require("../../templates/node.template");
const react_template_1 = require("../../templates/react.template");
const flutter_template_1 = require("../../templates/flutter.template");
const python_template_1 = require("../../templates/python.template");
const java_template_1 = require("../../templates/java.template");
// Helper: every group must have a non-empty comment and at least one rule
function assertValidGroups(groups) {
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
        expect(group.comment).toMatch(/^#/);
        expect(group.rules.length).toBeGreaterThan(0);
        for (const rule of group.rules) {
            expect(typeof rule).toBe('string');
            expect(rule.trim().length).toBeGreaterThan(0);
        }
    }
}
describe('Templates', () => {
    describe('common.template', () => {
        it('returns valid groups', () => assertValidGroups((0, common_template_1.getCommonRules)()));
        it('includes .env in secrets group', () => {
            const secrets = (0, common_template_1.getCommonRules)().find(g => g.comment.toLowerCase().includes('secret'));
            expect(secrets?.rules).toContain('.env');
        });
        it('includes *.log in logs group', () => {
            const logs = (0, common_template_1.getCommonRules)().find(g => g.comment.toLowerCase().includes('log'));
            expect(logs?.rules).toContain('*.log');
        });
        it('includes *.sqlite in database group', () => {
            const db = (0, common_template_1.getCommonRules)().find(g => g.comment.toLowerCase().includes('database'));
            expect(db?.rules).toContain('*.sqlite');
        });
        it('includes .DS_Store in OS group', () => {
            const os = (0, common_template_1.getCommonRules)().find(g => g.comment.toLowerCase().includes('os'));
            expect(os?.rules).toContain('.DS_Store');
        });
        it('includes .idea/ in IDE group', () => {
            const ide = (0, common_template_1.getCommonRules)().find(g => g.comment.toLowerCase().includes('ide'));
            expect(ide?.rules).toContain('.idea/');
        });
    });
    describe('node.template', () => {
        it('returns valid groups', () => assertValidGroups((0, node_template_1.getNodeRules)()));
        it('includes node_modules/', () => {
            const allRules = (0, node_template_1.getNodeRules)().flatMap(g => g.rules);
            expect(allRules).toContain('node_modules/');
        });
        it('includes dist/ in build group', () => {
            const build = (0, node_template_1.getNodeRules)().find(g => g.comment.toLowerCase().includes('build'));
            expect(build?.rules).toContain('dist/');
        });
    });
    describe('react.template', () => {
        it('getReactRules returns valid groups', () => assertValidGroups((0, react_template_1.getReactRules)()));
        it('getNextRules includes .next/', () => {
            const allRules = (0, react_template_1.getNextRules)().flatMap(g => g.rules);
            expect(allRules).toContain('.next/');
        });
        it('getAngularRules includes .angular/', () => {
            const allRules = (0, react_template_1.getAngularRules)().flatMap(g => g.rules);
            expect(allRules).toContain('.angular/');
        });
        it('getVueRules includes .nuxt/', () => {
            const allRules = (0, react_template_1.getVueRules)().flatMap(g => g.rules);
            expect(allRules).toContain('.nuxt/');
        });
    });
    describe('flutter.template', () => {
        it('returns valid groups', () => assertValidGroups((0, flutter_template_1.getFlutterRules)()));
        it('includes .dart_tool/', () => {
            const allRules = (0, flutter_template_1.getFlutterRules)().flatMap(g => g.rules);
            expect(allRules).toContain('.dart_tool/');
        });
        it('includes build/', () => {
            const allRules = (0, flutter_template_1.getFlutterRules)().flatMap(g => g.rules);
            expect(allRules).toContain('build/');
        });
    });
    describe('python.template', () => {
        it('returns valid groups', () => assertValidGroups((0, python_template_1.getPythonRules)()));
        it('includes __pycache__/', () => {
            const allRules = (0, python_template_1.getPythonRules)().flatMap(g => g.rules);
            expect(allRules).toContain('__pycache__/');
        });
        it('includes venv/', () => {
            const allRules = (0, python_template_1.getPythonRules)().flatMap(g => g.rules);
            expect(allRules).toContain('venv/');
        });
        it('includes .pytest_cache/', () => {
            const allRules = (0, python_template_1.getPythonRules)().flatMap(g => g.rules);
            expect(allRules).toContain('.pytest_cache/');
        });
    });
    describe('java.template', () => {
        it('getJavaRules returns valid groups', () => assertValidGroups((0, java_template_1.getJavaRules)()));
        it('getJavaRules includes target/', () => {
            const allRules = (0, java_template_1.getJavaRules)().flatMap(g => g.rules);
            expect(allRules).toContain('target/');
        });
        it('getLaravelRules includes vendor/', () => {
            const allRules = (0, java_template_1.getLaravelRules)().flatMap(g => g.rules);
            expect(allRules).toContain('vendor/');
        });
        it('getDotnetRules includes bin/', () => {
            const allRules = (0, java_template_1.getDotnetRules)().flatMap(g => g.rules);
            expect(allRules).toContain('bin/');
        });
        it('getDotnetRules includes obj/', () => {
            const allRules = (0, java_template_1.getDotnetRules)().flatMap(g => g.rules);
            expect(allRules).toContain('obj/');
        });
        it('getRustRules includes target/', () => {
            const allRules = (0, java_template_1.getRustRules)().flatMap(g => g.rules);
            expect(allRules).toContain('target/');
        });
        it('getGoRules includes vendor/', () => {
            const allRules = (0, java_template_1.getGoRules)().flatMap(g => g.rules);
            expect(allRules).toContain('vendor/');
        });
        it('getDockerRules returns valid groups', () => assertValidGroups((0, java_template_1.getDockerRules)()));
    });
});
//# sourceMappingURL=templates.test.js.map