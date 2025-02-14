'use client'

import React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { AlwaysSamplePolicyEditor } from './policy-editors/always-sample'
import { Policy } from '@/types/policy'
import { ProbabilisticPolicyEditor } from './policy-editors/probabilistic'
import { StatusCodePolicyEditor } from './policy-editors/status-code'
import { StringAttributePolicyEditor } from './policy-editors/string-attribute'
import { LatencyPolicyEditor } from './policy-editors/latency'
import { BooleanTagPolicyEditor } from './policy-editors/bool-attribute'
import { CompositePolicyEditor } from './policy-editors/composite'
import { OttlPolicyEditor } from './policy-editors/ottl'
import { SpanCountPolicyEditor } from './policy-editors/span-count'
import { NumericTagPolicyEditor } from './policy-editors/numeric-attribute'
import { TraceStatePolicyEditor } from './policy-editors/trace-state'
import { RateLimitingPolicyEditor } from './policy-editors/rate-limiting'
import { AndPolicyEditor } from './policy-editors/and'
import { Decision } from "@/types/trace"
import { Badge } from "@/components/ui/badge";
import { EditableText } from "@/components/ui/editable-text"
import { cn } from "@/lib/utils";

interface PolicyCardProps {
  policy: Policy;
  onUpdate: (policy: Policy) => void;
  onRemove: () => void;
  nested?: boolean;
  samplingDecision?: Decision;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onUpdate, onRemove, samplingDecision, nested }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const renderPolicyEditor = () => {
    switch (policy.type) {
      case 'probabilistic':
        return <ProbabilisticPolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'rate_limiting':
        return <RateLimitingPolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'status_code':
        return <StatusCodePolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'string_attribute':
        return <StringAttributePolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'latency':
        return <LatencyPolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'always_sample':
        return <AlwaysSamplePolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'boolean_attribute':
        return <BooleanTagPolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'composite':
        return <CompositePolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'numeric_attribute':
        return <NumericTagPolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'ottl_condition':
        return <OttlPolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'span_count':
        return <SpanCountPolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'trace_state':
        return <TraceStatePolicyEditor policy={policy} onUpdate={onUpdate} />;
      case 'and':
        return <AndPolicyEditor policy={policy} onUpdate={onUpdate} />;
      default:
        return <div>Unknown policy type: {(policy as Policy).type}</div>;
    }
  };

  const samplingDecisionClass = samplingDecision === undefined 
    ? ''
    : samplingDecision === Decision.Sampled 
      ? 'border-green-500	' 
      : 'border-destructive';

  const WrapperType = nested ? React.Fragment : Card;  

  return (
    <WrapperType {...(!nested ? { className: cn("transition-colors", samplingDecisionClass) } : {})}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="w-fit">{policy.type}</Badge>
            <EditableText
              value={policy.name}
              onChange={(value) => onUpdate({ ...policy, name: value })}
            />
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-9 p-0 hover:bg-transparent">
              <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200 text-foreground", {
                "-rotate-180": isOpen
              })}/>
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {renderPolicyEditor()}
          </CardContent>
          <CardFooter>
            <Button 
              variant="destructive"
              className="hover:bg-destructive/90 transition-colors"
              onClick={onRemove}
            >
              Remove
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </WrapperType>
  )
}
