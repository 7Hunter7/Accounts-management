export interface Account {
  id: string;
  label: { text: string }[]; // label является массивом объектов, где каждый объект имеет поле text типа string
  recordType: string;
  login: string;
  password?: string | null | undefined;
}
