export interface FirebaseCredProfile {
  uid: string;
  email: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  lastUpdated: string;
  projects: string[];
}

export interface AuthResponseProfile {
  credProfile?: FirebaseCredProfile | null;
  userProfile?: UserProfile | null;
}

export interface AWSUser {
  credProfile?: FirebaseCredProfile | null;
  userProfile?: UserProfile | null;
  isLoading?: boolean;
  error?: string;
  loginPage?: boolean;
}

export interface AuthRequest {
  email: string;
  password: string;
}
