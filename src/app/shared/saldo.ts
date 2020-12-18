export interface Saldo {
  saldo_id?: number;
  contract_id: number;
  period_id: number;
  debet: number;
  credit: number;
  openingbalance: number;
  closingbalance: number;
}

