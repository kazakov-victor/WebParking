import {IncomeType} from './income-type';

export interface Income {
  income_id?: number;
  dtfrom: string;
  dtto: string;
  quantity: number;
  incomeTypeDTO: IncomeType;
  }