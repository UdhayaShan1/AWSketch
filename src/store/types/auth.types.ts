export interface FirebaseCredProfile {
  uid: string;
  email: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  country: string;
  userCategory: string;
  lastUpdated: string;
}

export interface AuthResponseProfile {
  credProfile?: FirebaseCredProfile | null;
  userProfile?: UserProfile | null;
}

export interface AWSUser {
  credProfile?: FirebaseCredProfile | null;
  userProfile?: UserProfile | null;
  isLoading?: boolean;
  isLoggedIn?: boolean;
  error?: string;
  loginPage?: boolean;
  initialAuthCheckLoading?: boolean;
}

export interface AuthRequest {
  email: string;
  password: string;
}
