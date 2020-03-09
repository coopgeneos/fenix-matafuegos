import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { WorkOrder } from 'src/app/models/workOrder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService extends BaseServiceAPI<WorkOrder>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'workorder');
  }

  ordersToInvoice() : Observable<any> {
    return this.httpClient.get(environment.api_url+'workorder/toinvoice')
  }

  invoiceOrders(ids: number[], no: string, date: Date, note: string) : Observable<any> {
    let body = {
      ids: ids.toString(),
      invoiceNo: no,
      invoiceDate: date,
      invoiceNote: note
    }
    return this.httpClient.post(environment.api_url+'workorder/invoice', body)
  }

  getAllServices() : Observable<any> {
    return this.httpClient.get(environment.api_url+'job')
  }

  ordersToPrint() : Observable<any> {
    return this.httpClient.get(environment.api_url+'workorder/toprint')
  }

  printOrders(ids: number[]) : Observable<any> {
    let body = {
      'ids': ids
    }
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.post(environment.api_url+'workorder/print', body, { headers: headers, responseType: 'blob' })
  }
}
