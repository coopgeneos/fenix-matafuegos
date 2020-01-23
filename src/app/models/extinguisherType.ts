export enum ExtinguisherTypeCategory {
  A = "A",
  ABC = "ABC",
  AC = "AC",
  AB = "AB",
  BC = "BC",
  ABCD = "ABCD",
  D = "D",
  K = "K"
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