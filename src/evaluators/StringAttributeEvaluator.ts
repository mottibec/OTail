import { BasePolicyEvaluator } from './BaseEvaluator';
import { StringAttributePolicy } from '../types/PolicyTypes';
import { Trace, EvaluationResult } from '../types/TraceTypes';

export class StringAttributeEvaluator extends BasePolicyEvaluator {
    protected policy: StringAttributePolicy;
    private regexCache: Map<string, RegExp>;

    constructor(policy: StringAttributePolicy) {
        super(policy);
        this.policy = policy;
        this.regexCache = new Map();
    }

    evaluate(trace: Trace): EvaluationResult {
        for (const span of trace.spans) {
            const value = span.attributes[this.policy.key];
            if (value === undefined) {
                continue;
            }
            const matches = this.policy.enabledRegexMatching
                ? this.matchesRegex(value.toString())
                : this.policy.values.includes(value.toString());

            const decision = this.policy.invertMatch ? !matches : matches;

            if (decision) {
                return {
                    sampled: true,
                    reason: `Matched ${this.policy.key}=${value}`
                };
            }
        }

        return {
            sampled: false,
            reason: `No matching attribute ${this.policy.key} found`
        };
    }

    private matchesRegex(value: string): boolean {
        for (const pattern of this.policy.values) {
            let regex = this.regexCache.get(pattern);

            if (!regex) {
                try {
                    regex = new RegExp(pattern);
                    if (this.policy.cacheMaxSize && this.regexCache.size < this.policy.cacheMaxSize) {
                        this.regexCache.set(pattern, regex);
                    }
                } catch (e) {
                    console.error(`Invalid regex pattern: ${pattern}`);
                    continue;
                }
            }

            if (regex.test(value)) {
                return true;
            }
        }
        return false;
    }
} 