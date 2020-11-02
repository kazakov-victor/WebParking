import {Unit} from './unit';

export interface IncomeType {
  income_type_id?: number;
  unitDTO: Unit;
  name: string;
  sid_external: string;
  note: string;
  address: string;
}
