import {PaymentType} from './payment-type';

export interface Payment {
  payment_id?: number;
  contract_id: number;
  period_id?: number;
  payment_type_id: number;
  ts: string;
  amount: number;
  note: string;
}
