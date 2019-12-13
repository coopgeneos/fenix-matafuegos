import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { WorkOrder } from 'src/app/models/workOrder';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService extends BaseServiceAPI<WorkOrder>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'workorder');
  }
}
