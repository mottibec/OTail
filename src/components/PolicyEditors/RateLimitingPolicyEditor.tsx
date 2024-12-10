import React from 'react';
import { RateLimitingPolicy } from '../../types/PolicyTypes';
import { Input } from '../ui/input';

interface RateLimitingPolicyEditorProps {
  policy: RateLimitingPolicy;
  onUpdate: (policy: RateLimitingPolicy) => void;
}

export const RateLimitingPolicyEditor: React.FC<RateLimitingPolicyEditorProps> = ({
  policy,
  onUpdate,
}) => {
  return (
    <div className="policy-editor">
      <Input
        type="number"
        min="0"
        value={policy.spansPerSecond}
        onChange={(e) => onUpdate({
          ...policy,
          spansPerSecond: Number(e.target.value)
        })}
        placeholder="Enter spans per second"
      />
    </div>
  );
}; 