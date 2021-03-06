import {Person} from './person';
import {Income} from './income';

export interface Contract {
  contract_id?: number;
  number: number;
  balance: number;
  dtfrom: string;
  dtto: string;
  note: string;
  person_id: number;
  incomes: Income[];
}
