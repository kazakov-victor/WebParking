import {Person} from './person';
import {Income} from './income';

export interface Contract {
  contract_id?: number;
  number: number;
  personDTO: Person;
  balance: number;
  dtfrom: string;
  dtto: string;
  note: string;
  incomes: Income[];
}
