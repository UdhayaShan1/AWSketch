import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { AwsServiceNodeData } from "../../store/types/aws.types";
import { getServiceDefinition } from "./awsServices";

const AwsServiceNode: React.FC<NodeProps<AwsServiceNodeData>> = ({
  data,
  isConnectable,
  selected,
}) => {
  const serviceDef = getServiceDefinition(data.serviceDefinitionId);

  return (
    <div
      style={{
        border: selected ? "3px solid #1890ff" : "2px solid #d9d9d9",
        padding: "16px",
        borderRadius: "12px",
        background: "#fff",
        minWidth: "140px",
        textAlign: "center",
        boxShadow: selected
          ? "0 8px 24px rgba(24, 144, 255, 0.2)"
          : "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          background: "#1890ff",
          width: "12px",
          height: "12px",
          border: "2px solid #fff",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          background: "#1890ff",
          width: "12px",
          height: "12px",
          border: "2px solid #fff",
        }}
      />

      {/* Service Icon and Label */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {serviceDef?.icon && (
          <div
            style={{
              fontSize: "32px",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "#f0f7ff",
              border: "1px solid #d6e4ff",
            }}
          >
            {serviceDef.icon}
          </div>
        )}
        <div
          style={{
            fontWeight: 600,
            fontSize: "14px",
            color: "#262626",
            wordBreak: "break-word",
            lineHeight: "1.2",
          }}
        >
          {data.label || serviceDef?.name || "Unknown Service"}
        </div>
      </div>

      {/* Output Handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          background: "#52c41a",
          width: "12px",
          height: "12px",
          border: "2px solid #fff",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          background: "#52c41a",
          width: "12px",
          height: "12px",
          border: "2px solid #fff",
        }}
      />
    </div>
  );
};

export default memo(AwsServiceNode);
