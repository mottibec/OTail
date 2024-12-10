import React from 'react';
import { PolicyType } from '../../types/PolicyTypes';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SubPolicySelectProps {
    onSelect: (policy: PolicyType) => void;
}

export const SubPolicySelect: React.FC<SubPolicySelectProps> = ({ onSelect }) => {
    return <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Add Sub Policy" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="numeric_attribute">Numeric Attribute</SelectItem>
            <SelectItem value="probabilistic">Probabilistic</SelectItem>
            <SelectItem value="rate_limiting">Rate Limiting</SelectItem>
            <SelectItem value="status_code">Status Code</SelectItem>
            <SelectItem value="string_attribute">String Attribute</SelectItem>
            <SelectItem value="latency">Latency</SelectItem>
            <SelectItem value="always_sample">Always Sample</SelectItem>
            <SelectItem value="boolean_attribute">Boolean Attribute</SelectItem>
            <SelectItem value="ottl_condition">OTTL Condition</SelectItem>
            <SelectItem value="span_count">Span Count</SelectItem>
            <SelectItem value="trace_state">Trace State</SelectItem>
        </SelectContent>
    </Select>
}