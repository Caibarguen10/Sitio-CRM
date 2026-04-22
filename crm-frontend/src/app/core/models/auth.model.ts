export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface User {
  token: string;
  username: string;
  email: string;
  role: string;
}