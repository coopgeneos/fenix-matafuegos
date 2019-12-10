import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { Customer } from 'src/app/models/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseServiceAPI<Customer>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'customer');
  }
}
