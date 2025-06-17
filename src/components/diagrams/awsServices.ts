import type { AwsServiceDefinition } from "../../store/types/aws.types";

export const awsServiceDefinitions: AwsServiceDefinition[] = [
  { id: 'ec2', name: 'EC2 Instance', icon: '💻', nodeType: 'awsServiceNode' },
  { id: 's3', name: 'S3 Bucket', icon: '🪣', nodeType: 'awsServiceNode' },
  { id: 'lambda', name: 'Lambda Function', icon: 'λ', nodeType: 'awsServiceNode' },
  { id: 'vpc', name: 'VPC', icon: '🌐', nodeType: 'awsServiceNode' },
  { id: 'rds', name: 'RDS Database', icon: '💾', nodeType: 'awsServiceNode' },
  { id: 'api-gateway', name: 'API Gateway', icon: '🚪', nodeType: 'awsServiceNode' },
];

export const getServiceDefinition = (id: string): AwsServiceDefinition | undefined => {
  return awsServiceDefinitions.find(s => s.id === id);
};