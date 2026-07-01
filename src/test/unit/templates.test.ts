import { getCommonRules } from '../../templates/common.template';
import { getNodeRules } from '../../templates/node.template';
import {
  getReactRules,
  getNextRules,
  getAngularRules,
  getVueRules,
} from '../../templates/react.template';
import { getFlutterRules } from '../../templates/flutter.template';
import { getPythonRules } from '../../templates/python.template';
import {
  getJavaRules,
  getLaravelRules,
  getDotnetRules,
  getRustRules,
  getGoRules,
  getDockerRules,
} from '../../templates/java.template';

// Helper: every group must have a non-empty comment and at least one rule
function assertValidGroups(groups: ReturnType<typeof getCommonRules>) {
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
    it('returns valid groups', () => assertValidGroups(getCommonRules()));

    it('includes .env in secrets group', () => {
      const secrets = getCommonRules().find(g => g.comment.toLowerCase().includes('secret'));
      expect(secrets?.rules).toContain('.env');
    });

    it('includes *.log in logs group', () => {
      const logs = getCommonRules().find(g => g.comment.toLowerCase().includes('log'));
      expect(logs?.rules).toContain('*.log');
    });

    it('includes *.sqlite in database group', () => {
      const db = getCommonRules().find(g => g.comment.toLowerCase().includes('database'));
      expect(db?.rules).toContain('*.sqlite');
    });

    it('includes .DS_Store in OS group', () => {
      const os = getCommonRules().find(g => g.comment.toLowerCase().includes('os'));
      expect(os?.rules).toContain('.DS_Store');
    });

    it('includes .idea/ in IDE group', () => {
      const ide = getCommonRules().find(g => g.comment.toLowerCase().includes('ide'));
      expect(ide?.rules).toContain('.idea/');
    });
  });

  describe('node.template', () => {
    it('returns valid groups', () => assertValidGroups(getNodeRules()));

    it('includes node_modules/', () => {
      const allRules = getNodeRules().flatMap(g => g.rules);
      expect(allRules).toContain('node_modules/');
    });

    it('includes dist/ in build group', () => {
      const build = getNodeRules().find(g => g.comment.toLowerCase().includes('build'));
      expect(build?.rules).toContain('dist/');
    });
  });

  describe('react.template', () => {
    it('getReactRules returns valid groups', () => assertValidGroups(getReactRules()));
    it('getNextRules includes .next/', () => {
      const allRules = getNextRules().flatMap(g => g.rules);
      expect(allRules).toContain('.next/');
    });
    it('getAngularRules includes .angular/', () => {
      const allRules = getAngularRules().flatMap(g => g.rules);
      expect(allRules).toContain('.angular/');
    });
    it('getVueRules includes .nuxt/', () => {
      const allRules = getVueRules().flatMap(g => g.rules);
      expect(allRules).toContain('.nuxt/');
    });
  });

  describe('flutter.template', () => {
    it('returns valid groups', () => assertValidGroups(getFlutterRules()));
    it('includes .dart_tool/', () => {
      const allRules = getFlutterRules().flatMap(g => g.rules);
      expect(allRules).toContain('.dart_tool/');
    });
    it('includes build/', () => {
      const allRules = getFlutterRules().flatMap(g => g.rules);
      expect(allRules).toContain('build/');
    });
  });

  describe('python.template', () => {
    it('returns valid groups', () => assertValidGroups(getPythonRules()));
    it('includes __pycache__/', () => {
      const allRules = getPythonRules().flatMap(g => g.rules);
      expect(allRules).toContain('__pycache__/');
    });
    it('includes venv/', () => {
      const allRules = getPythonRules().flatMap(g => g.rules);
      expect(allRules).toContain('venv/');
    });
    it('includes .pytest_cache/', () => {
      const allRules = getPythonRules().flatMap(g => g.rules);
      expect(allRules).toContain('.pytest_cache/');
    });
  });

  describe('java.template', () => {
    it('getJavaRules returns valid groups', () => assertValidGroups(getJavaRules()));
    it('getJavaRules includes target/', () => {
      const allRules = getJavaRules().flatMap(g => g.rules);
      expect(allRules).toContain('target/');
    });
    it('getLaravelRules includes vendor/', () => {
      const allRules = getLaravelRules().flatMap(g => g.rules);
      expect(allRules).toContain('vendor/');
    });
    it('getDotnetRules includes bin/', () => {
      const allRules = getDotnetRules().flatMap(g => g.rules);
      expect(allRules).toContain('bin/');
    });
    it('getDotnetRules includes obj/', () => {
      const allRules = getDotnetRules().flatMap(g => g.rules);
      expect(allRules).toContain('obj/');
    });
    it('getRustRules includes target/', () => {
      const allRules = getRustRules().flatMap(g => g.rules);
      expect(allRules).toContain('target/');
    });
    it('getGoRules includes vendor/', () => {
      const allRules = getGoRules().flatMap(g => g.rules);
      expect(allRules).toContain('vendor/');
    });
    it('getDockerRules returns valid groups', () => assertValidGroups(getDockerRules()));
  });
});
