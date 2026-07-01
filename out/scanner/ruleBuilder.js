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
exports.RuleBuilder = void 0;
const vscode = __importStar(require("vscode"));
const constants_1 = require("../utils/constants");
const common_template_1 = require("../templates/common.template");
const node_template_1 = require("../templates/node.template");
const react_template_1 = require("../templates/react.template");
const flutter_template_1 = require("../templates/flutter.template");
const python_template_1 = require("../templates/python.template");
const java_template_1 = require("../templates/java.template");
class RuleBuilder {
    build(detectedTechnologies) {
        const config = vscode.workspace.getConfiguration('smartGitIgnore');
        const detectSecrets = config.get('detectSecrets', true);
        const detectLogs = config.get('detectLogs', true);
        const detectDb = config.get('detectDatabaseFiles', true);
        const groups = [];
        const techNames = detectedTechnologies.map(t => t.technology);
        // Always include common rules
        const commonGroups = (0, common_template_1.getCommonRules)();
        for (const group of commonGroups) {
            if (group.category === constants_1.CATEGORIES.SECRETS && !detectSecrets)
                continue;
            if (group.category === constants_1.CATEGORIES.LOGS && !detectLogs)
                continue;
            if (group.category === constants_1.CATEGORIES.DATABASE && !detectDb)
                continue;
            groups.push(group);
        }
        // Tech-specific rules
        if (techNames.includes('Node.js')) {
            groups.push(...(0, node_template_1.getNodeRules)());
        }
        if (techNames.includes('React')) {
            groups.push(...(0, react_template_1.getReactRules)());
        }
        if (techNames.includes('Next.js')) {
            groups.push(...(0, react_template_1.getNextRules)());
        }
        if (techNames.includes('Angular')) {
            groups.push(...(0, react_template_1.getAngularRules)());
        }
        if (techNames.includes('Vue')) {
            groups.push(...(0, react_template_1.getVueRules)());
        }
        if (techNames.includes('Flutter/Dart')) {
            groups.push(...(0, flutter_template_1.getFlutterRules)());
        }
        if (techNames.includes('Python')) {
            groups.push(...(0, python_template_1.getPythonRules)());
        }
        if (techNames.includes('Java')) {
            groups.push(...(0, java_template_1.getJavaRules)());
        }
        if (techNames.includes('Laravel')) {
            groups.push(...(0, java_template_1.getLaravelRules)());
        }
        if (techNames.includes('.NET')) {
            groups.push(...(0, java_template_1.getDotnetRules)());
        }
        if (techNames.includes('Rust')) {
            groups.push(...(0, java_template_1.getRustRules)());
        }
        if (techNames.includes('Go')) {
            groups.push(...(0, java_template_1.getGoRules)());
        }
        if (techNames.includes('Docker')) {
            groups.push(...(0, java_template_1.getDockerRules)());
        }
        return this.deduplicateGroups(groups);
    }
    deduplicateGroups(groups) {
        const seen = new Set();
        return groups.map(group => ({
            ...group,
            rules: group.rules.filter(rule => {
                if (seen.has(rule))
                    return false;
                seen.add(rule);
                return true;
            }),
        })).filter(g => g.rules.length > 0);
    }
}
exports.RuleBuilder = RuleBuilder;
//# sourceMappingURL=ruleBuilder.js.map