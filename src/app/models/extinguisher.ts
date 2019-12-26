import { Customer } from './customer';
import { ExtinguisherType } from './extinguisherType';

export enum ExtinguisherCategory {
  VEHICULAR = "VEHICULAR",
  DOMICILIARIO = "DOMICILIARIO"
} 
export class Extinguisher {
  id: number;
  code: string;
  customer: Customer;
  type: ExtinguisherType;
  category: ExtinguisherCategory;
  location: string;
  costCenter: string;
  address: string;
  factoryNo: number;
  bvNo: number;
  manufacturingDate: Date;
  lastLoad: string;
  lastHydraulicTest: string;
  idCar: string;

  constructor() {
    this.id = 0;
    this.code = ""; 
    this.customer = null;
    this.type = null;
    this.category = null;
    this.location = "";
    this.costCenter = "";
    this.address = ""; 
    this.factoryNo = 0;
    this.bvNo = 0;
    this.manufacturingDate = null;
    this.lastLoad = null;
    this.lastHydraulicTest = null;
    this.idCar = null;
  }
}