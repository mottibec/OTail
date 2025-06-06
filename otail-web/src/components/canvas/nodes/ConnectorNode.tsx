import { Handle, Position } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftRight, Grip } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ConnectorNodeProps {
  data: {
    label: string;
    config: any;
    isSource: boolean;
    sourcePipelineType: string;
    targetPipelineType: string;
  };
  handleStyle?: React.CSSProperties;
}

export const ConnectorNode = ({ data, handleStyle }: ConnectorNodeProps) => {
  const { sourcePipelineType, targetPipelineType, label, isSource } = data;
  const nodeStyle = {
    zIndex: 10,
  };

  return (
    <Card className="min-w-48 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-background" style={nodeStyle}>
      <div className="p-1 bg-amber-100/50 dark:bg-amber-900/20 flex items-center justify-between border-b border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-1 pl-1">
          <Grip size={12} className="text-amber-400 dark:text-amber-500" />
          <Badge variant="outline" className="text-[10px] py-0 h-4 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700">
            Connector
          </Badge>
        </div>
      </div>
      <CardContent className="p-2 pt-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-900/40">
              <ArrowLeftRight size={14} className="text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </div>
          <div className="flex items-center gap-2 pl-7">
            <Badge variant="outline" className="text-[10px] py-0 h-4 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700">
              {isSource ? "Source" : "Target"}
            </Badge>
          </div>
          {sourcePipelineType && targetPipelineType && (
            <div className="text-xs text-muted-foreground pl-7 truncate">
              {sourcePipelineType} → {targetPipelineType}
            </div>
          )}
        </div>
      </CardContent>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          ...handleStyle,
          left: '-7px',
          backgroundColor: '#d97706', // Amber-600
          border: '2px solid var(--background)',
          zIndex: 20, // Higher z-index to ensure it's clickable
          width: '14px',
          height: '14px',
        }}
        id='target-handle'
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          ...handleStyle,
          right: '-7px',
          backgroundColor: '#d97706', // Amber-600
          border: '2px solid var(--background)',
          zIndex: 20, // Higher z-index to ensure it's clickable
          width: '14px',
          height: '14px',
        }}
        id='source-handle'
      />
    </Card>
  );
};

export default ConnectorNode;
