import type { AwsServiceDefinition } from "../../store/types/aws.types";

export const awsServiceDefinitions: AwsServiceDefinition[] = [
  // Compute
  { id: 'ec2', name: 'EC2 Instance', icon: '💻', nodeType: 'awsServiceNode' },
  { id: 'lambda', name: 'Lambda Function', icon: 'λ', nodeType: 'awsServiceNode' },
  { id: 'ecs', name: 'ECS Container', icon: '📦', nodeType: 'awsServiceNode' },
  { id: 'eks', name: 'EKS Cluster', icon: '☸️', nodeType: 'awsServiceNode' },
  { id: 'fargate', name: 'Fargate', icon: '🚀', nodeType: 'awsServiceNode' },
  { id: 'batch', name: 'Batch', icon: '⚡', nodeType: 'awsServiceNode' },

  // Storage
  { id: 's3', name: 'S3 Bucket', icon: '🪣', nodeType: 'awsServiceNode' },
  { id: 'ebs', name: 'EBS Volume', icon: '💽', nodeType: 'awsServiceNode' },
  { id: 'efs', name: 'EFS File System', icon: '📁', nodeType: 'awsServiceNode' },
  { id: 'fsx', name: 'FSx', icon: '🗂️', nodeType: 'awsServiceNode' },

  // Database
  { id: 'rds', name: 'RDS Database', icon: '💾', nodeType: 'awsServiceNode' },
  { id: 'dynamodb', name: 'DynamoDB', icon: '🗄️', nodeType: 'awsServiceNode' },
  { id: 'elasticache', name: 'ElastiCache', icon: '⚡', nodeType: 'awsServiceNode' },
  { id: 'redshift', name: 'Redshift', icon: '📊', nodeType: 'awsServiceNode' },
  { id: 'aurora', name: 'Aurora', icon: '🌅', nodeType: 'awsServiceNode' },

  // Networking
  { id: 'vpc', name: 'VPC', icon: '🌐', nodeType: 'awsServiceNode' },
  { id: 'alb', name: 'Application Load Balancer', icon: '⚖️', nodeType: 'awsServiceNode' },
  { id: 'nlb', name: 'Network Load Balancer', icon: '🔗', nodeType: 'awsServiceNode' },
  { id: 'cloudfront', name: 'CloudFront', icon: '🌍', nodeType: 'awsServiceNode' },
  { id: 'route53', name: 'Route 53', icon: '🌐', nodeType: 'awsServiceNode' },
  { id: 'nat-gateway', name: 'NAT Gateway', icon: '🚪', nodeType: 'awsServiceNode' },

  // API & Integration
  { id: 'api-gateway', name: 'API Gateway', icon: '🚪', nodeType: 'awsServiceNode' },
  { id: 'sns', name: 'SNS', icon: '📢', nodeType: 'awsServiceNode' },
  { id: 'sqs', name: 'SQS', icon: '📨', nodeType: 'awsServiceNode' },
  { id: 'eventbridge', name: 'EventBridge', icon: '🌉', nodeType: 'awsServiceNode' },
  { id: 'step-functions', name: 'Step Functions', icon: '🔄', nodeType: 'awsServiceNode' },

  // Security & Identity
  { id: 'iam', name: 'IAM', icon: '👤', nodeType: 'awsServiceNode' },
  { id: 'cognito', name: 'Cognito', icon: '🔐', nodeType: 'awsServiceNode' },
  { id: 'secrets-manager', name: 'Secrets Manager', icon: '🔑', nodeType: 'awsServiceNode' },
  { id: 'waf', name: 'WAF', icon: '🛡️', nodeType: 'awsServiceNode' },

  // Monitoring & Analytics
  { id: 'cloudwatch', name: 'CloudWatch', icon: '📊', nodeType: 'awsServiceNode' },
  { id: 'kinesis', name: 'Kinesis', icon: '🌊', nodeType: 'awsServiceNode' },
  { id: 'elasticsearch', name: 'OpenSearch', icon: '🔍', nodeType: 'awsServiceNode' },

  // Developer Tools
  { id: 'codecommit', name: 'CodeCommit', icon: '📝', nodeType: 'awsServiceNode' },
  { id: 'codebuild', name: 'CodeBuild', icon: '🔨', nodeType: 'awsServiceNode' },
  { id: 'codepipeline', name: 'CodePipeline', icon: '🔄', nodeType: 'awsServiceNode' },
];

export const getServiceDefinition = (id: string): AwsServiceDefinition | undefined => {
  return awsServiceDefinitions.find(s => s.id === id);
};