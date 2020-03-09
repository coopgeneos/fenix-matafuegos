export class Configuration {
  vehicularDPSPrefix: string;
  vehicularDPSInit: number;
  vehicularDPSEnd: number;
  vehicularDPSCurrent: number;
  vehicularDPSIncrement: number;
  domiciliaryDPSPrefix: string;
  domiciliaryDPSInit: number;
  domiciliaryDPSEnd: number;
  domiciliaryDPSCurrent: number;
  domiciliaryDPSIncrement: number;

  constructor() {
    this.vehicularDPSPrefix = "";
    this.domiciliaryDPSPrefix = "";
  }
}