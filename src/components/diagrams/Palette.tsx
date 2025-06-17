import React from "react";
import { Card, Space, Typography } from "antd";
import type { AwsServiceDefinition } from "../../store/types/aws.types";

const { Text } = Typography;

interface PaletteProps {
  services: AwsServiceDefinition[];
}

const Palette: React.FC<PaletteProps> = ({ services }) => {
  const onDragStart = (
    event: React.DragEvent,
    service: AwsServiceDefinition
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(service)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  // Group services by category for better organization
  const serviceCategories = {
    compute: ["ec2", "lambda"],
    storage: ["s3", "s4"],
    database: ["rds"],
    networking: ["vpc", "api-gateway"],
  };

  const getCategoryServices = (categoryIds: string[]) => {
    return services.filter((service) => categoryIds.includes(service.id));
  };

  const ServiceItem: React.FC<{ service: AwsServiceDefinition }> = ({
    service,
  }) => (
    <div
      onDragStart={(event) => onDragStart(event, service)}
      draggable
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        margin: "8px 0",
        backgroundColor: "#fff",
        border: "2px solid #e8e8e8",
        borderRadius: "8px",
        cursor: "grab",
        transition: "all 0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#1890ff";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e8e8e8";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      <span style={{ fontSize: "24px", minWidth: "24px" }}>{service.icon}</span>
      <Text strong style={{ fontSize: "14px" }}>
        {service.name}
      </Text>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Drag services to the canvas to build your architecture
        </Text>
      </div>

      {/* Compute Services */}
      <div style={{ marginBottom: "20px" }}>
        <Text
          strong
          style={{
            color: "#1890ff",
            fontSize: "13px",
            textTransform: "uppercase",
          }}
        >
          Compute
        </Text>
        {getCategoryServices(serviceCategories.compute).map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>

      {/* Storage Services */}
      <div style={{ marginBottom: "20px" }}>
        <Text
          strong
          style={{
            color: "#52c41a",
            fontSize: "13px",
            textTransform: "uppercase",
          }}
        >
          Storage
        </Text>
        {getCategoryServices(serviceCategories.storage).map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>

      {/* Database Services */}
      <div style={{ marginBottom: "20px" }}>
        <Text
          strong
          style={{
            color: "#faad14",
            fontSize: "13px",
            textTransform: "uppercase",
          }}
        >
          Database
        </Text>
        {getCategoryServices(serviceCategories.database).map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>

      {/* Networking Services */}
      <div style={{ marginBottom: "20px" }}>
        <Text
          strong
          style={{
            color: "#722ed1",
            fontSize: "13px",
            textTransform: "uppercase",
          }}
        >
          Networking
        </Text>
        {getCategoryServices(serviceCategories.networking).map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Palette;
