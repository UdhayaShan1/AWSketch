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

  // Updated service categories with all new AWS services
  const serviceCategories = {
    compute: ["ec2", "lambda", "ecs", "eks", "fargate", "batch"],
    storage: ["s3", "ebs", "efs", "fsx"],
    database: ["rds", "dynamodb", "elasticache", "redshift", "aurora"],
    networking: ["vpc", "alb", "nlb", "cloudfront", "route53", "nat-gateway"],
    apiIntegration: [
      "api-gateway",
      "sns",
      "sqs",
      "eventbridge",
      "step-functions",
    ],
    security: ["iam", "cognito", "secrets-manager", "waf"],
    monitoring: ["cloudwatch", "kinesis", "elasticsearch"],
    devTools: ["codecommit", "codebuild", "codepipeline"],
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

  const CategorySection: React.FC<{
    title: string;
    color: string;
    serviceIds: string[];
    description?: string;
  }> = ({ title, color, serviceIds, description }) => {
    const categoryServices = getCategoryServices(serviceIds);

    if (categoryServices.length === 0) return null;

    return (
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "8px" }}>
          <Text
            strong
            style={{
              color,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </Text>
          {description && (
            <Text
              type="secondary"
              style={{
                fontSize: "11px",
                display: "block",
                marginTop: "2px",
                fontStyle: "italic",
              }}
            >
              {description}
            </Text>
          )}
        </div>
        {categoryServices.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Drag AWS services to the canvas to build your architecture
        </Text>
      </div>

      {/* Compute Services */}
      <CategorySection
        title="Compute"
        color="#1890ff"
        serviceIds={serviceCategories.compute}
        description="Processing power and execution environments"
      />

      {/* Storage Services */}
      <CategorySection
        title="Storage"
        color="#52c41a"
        serviceIds={serviceCategories.storage}
        description="Data storage and file systems"
      />

      {/* Database Services */}
      <CategorySection
        title="Database"
        color="#faad14"
        serviceIds={serviceCategories.database}
        description="Managed database and data warehousing"
      />

      {/* Networking Services */}
      <CategorySection
        title="Networking"
        color="#722ed1"
        serviceIds={serviceCategories.networking}
        description="Network infrastructure and content delivery"
      />

      {/* API & Integration Services */}
      <CategorySection
        title="API & Integration"
        color="#eb2f96"
        serviceIds={serviceCategories.apiIntegration}
        description="Application integration and messaging"
      />

      {/* Security & Identity Services */}
      <CategorySection
        title="Security & Identity"
        color="#f5222d"
        serviceIds={serviceCategories.security}
        description="Authentication, authorization, and security"
      />

      {/* Monitoring & Analytics Services */}
      <CategorySection
        title="Monitoring & Analytics"
        color="#13c2c2"
        serviceIds={serviceCategories.monitoring}
        description="Observability and data analytics"
      />

      {/* Developer Tools */}
      <CategorySection
        title="Developer Tools"
        color="#fa8c16"
        serviceIds={serviceCategories.devTools}
        description="CI/CD and development workflow"
      />
    </div>
  );
};

export default Palette;
