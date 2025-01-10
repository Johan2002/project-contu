import { IDebt } from '../debt/debt.interface';
import { IPayment } from '../payment/payment.interface';
import { ISale } from '../sale/sale.interface';

export interface ICustomer {
  customerId: string;
  customerIdentity: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  debts: Array<IDebt>;
  payments: Array<IPayment>;
  sales: Array<ISale>;
}

export type ICreateCustomer = Pick<
  ICustomer,
  | 'customerIdentity'
  | 'customerName'
  | 'customerPhone'
  | 'customerEmail'
  | 'customerAddress'
>;

export type IUpdateCustomer = Partial<ICreateCustomer>;
