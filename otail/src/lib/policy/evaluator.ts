import { PolicyEvaluator } from '../evaluators/BaseEvaluator';
import { Trace, Decision, DecisionResult } from '@/types/trace';


export const makeDecision = (trace: Trace, policies: PolicyEvaluator[]): DecisionResult => {
    let finalDecision: Decision = Decision.NotSampled;

    const samplingDecision: Record<Decision, boolean> = {
        [Decision.Error]: false,
        [Decision.Sampled]: false,
        [Decision.NotSampled]: false,
        [Decision.InvertSampled]: false,
        [Decision.InvertNotSampled]: false
    };
    const policyDecisions: Record<string, Decision> = {}

    for (const policy of policies) {
        try {
            const decision = policy.evaluate(trace);
            samplingDecision[decision] = true;
            policyDecisions[policy.policyName] = decision;

        } catch (error) {
            samplingDecision[Decision.Error] = true;
            console.error('Sampling policy error', error);
        }
    }

    if (samplingDecision[Decision.InvertNotSampled]) {
        finalDecision = Decision.NotSampled;
    }

    if (samplingDecision[Decision.Sampled]) {
        finalDecision = Decision.Sampled;
    }

    if (samplingDecision[Decision.InvertSampled] && !samplingDecision[Decision.NotSampled]) {
        finalDecision = Decision.Sampled;
    }
    return {
        finalDecision,
        policyDecisions
    };
}