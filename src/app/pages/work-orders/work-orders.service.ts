import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { WorkOrder } from 'src/app/models/workOrder';
import { HttpClient } from '@angular/common/http';
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
}
