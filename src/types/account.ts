export interface Account {
  id: string;
  label: string;
  recordType: string;
  login: string;
  password?: string | null;
}
