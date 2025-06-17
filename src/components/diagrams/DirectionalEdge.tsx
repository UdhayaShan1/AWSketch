// Create: src/components/diagrams/DirectionalEdge.tsx
import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, type EdgeProps } from 'reactflow';

export const DirectionalEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: data?.type === 'data' ? '#52c41a' : 
                  data?.type === 'control' ? '#1890ff' : 
                  data?.type === 'error' ? '#ff4d4f' : '#722ed1',
        }}
      />
      
      {/* Direction Arrow in the middle */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 16,
            pointerEvents: 'all',
            backgroundColor: 'white',
            border: '2px solid #666',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          className="nodrag nopan"
        >
          {data?.type === 'data' ? '📊' : 
           data?.type === 'control' ? '⚡' : 
           data?.type === 'error' ? '⚠️' : '🔄'}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DirectionalEdge;