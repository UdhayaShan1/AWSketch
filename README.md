# AWSketch - AWS Architecture Design and Generation Tool

Introducing AWSketch, a LLM-powered web application that allows developers, architects and anyone for that matter to design, visualise and manage AWS cloud architectures with an intuitive drag-and-drop interface.

## 🚀 Features

### AWS Service Categories
- **Compute** - EC2, Lambda, ECS, EKS, Fargate, Batch
- **Storage** - S3, EBS, EFS, FSx
- **Database** - RDS, DynamoDB, ElastiCache, Redshift, Aurora
- **Networking** - VPC, ALB, NLB, CloudFront, Route 53, NAT Gateway
- **Security** - IAM, Cognito, Secrets Manager, WAF
- **Integration** - API Gateway, SNS, SQS, EventBridge, Step Functions
- **Monitoring** - CloudWatch, Kinesis, OpenSearch
- **DevOps** - CodeCommit, CodeBuild, CodePipeline

### 📊 Project Management
- Create Project

![alt text](https://github.com/UdhayaShan1/AWSketch/blob/master/src/assets/screenshots/create_project.png)

- View Projects

![alt text](https://github.com/UdhayaShan1/AWSketch/blob/master/src/assets/screenshots/view_projects.png)

- Edit and Delete

### 🎨 Diagram

- Edit and create a diagram for your project with drag and drop functions.

![alt text](https://github.com/UdhayaShan1/AWSketch/blob/master/src/assets/screenshots/diagram_example.png)

- Import and Export to JSON to share diagrams

- Auto-save functionality


### 🛠️ Tech Stack
- **Frontend**: React + TypeScript
- **Diagramming**: ReactFlow
- **State Management**: Redux Toolkit + Redux Saga _(i love Saga)_
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Build Tool**: Vite

### Future Development

I plan to introduce LLM generation of diagrams.

### 📦 Installation

You may wish to update `firebase.ts` with your own Firebase project credentials.

Firestore Database Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own UserProfile
    match /UserProfile/{userId} {
      allow read, write, delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Projects are stored with the user's UID as the document ID
    match /Projects/{userId} {
      allow read, write, delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

```python
# Clone the repository
git clone https://github.com/UdhayaShan1/AWSketch.git

# Install dependencies
npm install

# Start development server
npm run dev
```


### 🤝 Contributing

We welcome contributions from the community! Feel free to submit pull requests, report issues, or suggest new features. This open-source project is designed to grow and evolve with input from developers like you.

### 💝 Built with passion by developers, for developers




