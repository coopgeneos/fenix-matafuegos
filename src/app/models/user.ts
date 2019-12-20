export enum Role {
  "ADMIN" = "admin",
  "OPERARIO" = "operario"
}
export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: Role;
  
  constructor() { 
    this.name = "";
    this.username = "";
    this.password = "";
    this.role = null; 
  }
}






