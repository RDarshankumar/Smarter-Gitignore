"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../utils/constants");
describe('constants', () => {
    it('GITIGNORE_FILE is .gitignore', () => {
        expect(constants_1.GITIGNORE_FILE).toBe('.gitignore');
    });
    it('LARGE_FILE_THRESHOLD_MB is 50', () => {
        expect(constants_1.LARGE_FILE_THRESHOLD_MB).toBe(50);
    });
    it('CATEGORIES contains all expected keys', () => {
        const expected = [
            'COMMON', 'NODE', 'REACT', 'NEXT', 'ANGULAR', 'VUE',
            'FLUTTER', 'PYTHON', 'JAVA', 'GO', 'RUST', 'DOTNET',
            'DOCKER', 'LARAVEL', 'SECRETS', 'LOGS', 'DATABASE',
            'CACHE', 'IDE', 'BUILD', 'MEDIA', 'OS',
        ];
        for (const key of expected) {
            expect(constants_1.CATEGORIES).toHaveProperty(key);
        }
    });
    it('CATEGORIES values are non-empty strings', () => {
        for (const value of Object.values(constants_1.CATEGORIES)) {
            expect(typeof value).toBe('string');
            expect(value.length).toBeGreaterThan(0);
        }
    });
});
//# sourceMappingURL=constants.test.js.map