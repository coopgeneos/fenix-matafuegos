import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { ExtinguisherType } from 'src/app/models/extinguisherType';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExtinguisherTypeService extends BaseServiceAPI<ExtinguisherType>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'extinguishertype');
  }
}
