import {PaymentType} from './payment-type';
import {Contract} from './contract';

export interface Payment {
  payment_id?: number;
  contract_id: number;
  payment_type_id: PaymentType;
  ts: string;
  amount: number;
  note: string;
}
