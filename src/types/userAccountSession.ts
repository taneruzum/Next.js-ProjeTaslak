export interface UserAccountState {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  nationality: string;
  profileImages: string[];
  loading: boolean;
  error: string | null;
}
