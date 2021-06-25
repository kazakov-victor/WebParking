import {IncomeType} from './income-type';

export interface Price {
  price_id?: number;
  incometype_id: IncomeType;
  dtfrom: string;
  dtto: string;
  amount: number;
}
