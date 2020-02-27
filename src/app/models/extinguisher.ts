import { Customer } from './customer';
import { ExtinguisherType } from './extinguisherType';

export enum ExtinguisherCategory {
  VEHICULAR = "VEHICULAR",
  DOMICILIARIO = "DOMICILIARIO"
} 
export class Extinguisher {
  id: number;
  code: string;
  extinguisherNo: number;
  customer: Customer;
  type: ExtinguisherType;
  category: ExtinguisherCategory;
  location: string;
  locationNo: number;
  costCenter: string;
  address: string;
  bvNo: number;
  manufacturingDate: Date;
  lastLoad: string;
  lastHydraulicTest: string;
  idCar: string;
  dps: string;
  mark: string;

  constructor() {
    this.id = 0;
    this.code = ""; 
    this.customer = null;
    this.type = null;
    this.category = null;
    this.location = "";
    this.locationNo = null;
    this.costCenter = "";
    this.address = ""; 
    this.extinguisherNo = null;
    this.bvNo = null;
    this.manufacturingDate = null;
    this.lastLoad = null;
    this.lastHydraulicTest = null;
    this.idCar = null;
    this.dps = null;
    this.mark = null;
  }
}