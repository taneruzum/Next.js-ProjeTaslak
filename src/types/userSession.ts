export interface UserSessionState {
  authControl: boolean;
  userId: string;
  loading: boolean;
  error: string | null;
}
