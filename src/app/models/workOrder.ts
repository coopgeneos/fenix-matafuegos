import { Customer } from './customer';
import { Extinguisher } from './extinguisher';
import { User } from './user';

export enum WOrderState {
  CREADA = "CREADA",
  COMPLETANDOSE = "COMPLETANDOSE",
  CERRADA = "CERRADA",
  CANCELADA = "CANCELADA",
  FACTURADA = "FACTURADA"
}
export class WorkOrder {
  id: number;
  // orderNo: string;
  customer: Customer;
  extinguisher: Extinguisher;
  toDoList: string;
  doneList: string;
  doneBy: User;
  doneDate: string;
  closeBy: User;
  closeDate: string;
  cancelNote: string;
  invoiceNo: string;
  invoiceDate: Date;
  invoiceNote: string;
  state: WOrderState;

  constructor() {
    // this.orderNo = "";
    this.customer = null;
    this.extinguisher = null;
    this.toDoList = "";
    this.doneList = "";
    this.doneBy = null;
    this.doneDate = null;
    this.closeBy = null;
    this.closeDate = null;
    this.closeDate = null;
    this.state = null;
    this.invoiceNo = null;
    this.invoiceDate = null;
    this.invoiceNote = null;
  }
}