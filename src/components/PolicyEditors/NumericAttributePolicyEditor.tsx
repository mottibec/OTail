import React from 'react';
import { NumericTagPolicy } from '../../types/PolicyTypes';
import { Input } from '../ui/input';

interface NumericTagPolicyEditorProps {
  policy: NumericTagPolicy;
  onUpdate: (policy: NumericTagPolicy) => void;
}

export const NumericTagPolicyEditor: React.FC<NumericTagPolicyEditorProps> = ({
  policy,
  onUpdate,
}) => {
  const handleChange = (field: keyof NumericTagPolicy, value: string | number) => {
    onUpdate({
      ...policy,
      [field]: value,
    });
  };

  return (
    <div className="policy-editor">
      <Input
        value={policy.key}
        onChange={(e) => handleChange('key', e.target.value)}
        placeholder="Enter attribute key"
      />
      <Input
        type="number"
        value={policy.minValue}
        onChange={(e) => handleChange('minValue', Number(e.target.value))}
      />
      <Input
        type="number"
        value={policy.maxValue}
        onChange={(e) => handleChange('maxValue', Number(e.target.value))}
      />
    </div>
  );
}; 