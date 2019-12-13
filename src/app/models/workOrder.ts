import { Customer } from './customer';
import { Extinguisher } from './extinguisher';
import { User } from './user';

export class WorkOrder {
  id: number;
  orderNo: string;
  customer: Customer;
  extinguisher: Extinguisher;
  services: string;
  made: string;
  madeBy: User;
  madeDate: string;
  closeBy: User;
  closeDate: string;
  canceled: string;
  state: string;

  constructor() {
    this.orderNo = "";
    this.customer = null;
    this.extinguisher = null;
    this.services = "";
    this.made = "";
    this.madeBy = null;
    this.madeDate = null;
    this.closeBy = null;
    this.closeDate = null;
    this.closeDate = null;
    this.state = null;
  }
}