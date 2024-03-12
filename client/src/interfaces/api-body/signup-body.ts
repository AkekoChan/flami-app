export interface SignupBody {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  age: string;
  metadata: {
    favorite_sport: string;
    origin: string;
    intent: string;
  };
}
