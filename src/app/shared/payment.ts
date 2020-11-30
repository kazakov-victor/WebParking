import {PaymentType} from './payment-type';
import {Contract} from './contract';

export interface Payment {
  payment_id?: number;
  contract?: Contract;
  period_id?: number;
  paymentType?: PaymentType;
  ts?: string;
  amount?: number;
  note: string;
}
