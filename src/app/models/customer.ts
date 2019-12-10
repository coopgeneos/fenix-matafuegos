export class Customer {
  id: number;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  web: string;
  type: string;

  constructor() {
    this.code = ""; 
    this.name = "";
    this.address = "";
    this.phone = "";
    this.email = ""; 
    this.web = "";
    this.type = "";
  }
}