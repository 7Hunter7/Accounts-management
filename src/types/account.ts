export interface Account {
  id: string;
  label: { text: string }[]; // label является строкой или массивом объектов, где каждый объект имеет поле text типа string
  labelString?: string;
  recordType: string;
  login: string;
  password?: string | null;
}
