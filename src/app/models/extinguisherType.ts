export class ExtinguisherType {
  id: number;
  code: string;
  category: string;
  loadExpiration: number;
  phExpiration: number;
  weight: number;
  volume: number;

  constructor() {
    this.id = 0;
    this.code = ""; 
    this.category = "";
    this.loadExpiration = 0;
    this.phExpiration = 0;
    this.weight = 0; 
    this.volume = 0;
  }
}