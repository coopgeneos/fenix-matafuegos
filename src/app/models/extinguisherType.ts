export enum ExtinguisherTypeCategory {
  A = "A",
  D = "D",
  K = "K",
  AC = "AC",
  BC_GAS = "BC GAS",
  BC_POLVO = "BC POLVO",
  AK = "AK",
  ABC = "ABC",
  HCFC = "HCFC"
}
export class ExtinguisherType {
  id: number;
  // code: string;
  category: ExtinguisherTypeCategory;
  loadExpiration: number;
  phExpiration: number;
  weight: number;
  volume: number;

  constructor() {
    this.id = 0;
    // this.code = ""; 
    this.category = null;
    this.loadExpiration = 0;
    this.phExpiration = 0;
    this.weight = 0; 
    this.volume = 0;
  }
}