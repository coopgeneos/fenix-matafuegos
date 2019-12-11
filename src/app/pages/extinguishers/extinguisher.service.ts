import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { HttpClient } from '@angular/common/http';
import { Extinguisher } from 'src/app/models/extinguisher';

@Injectable({
  providedIn: 'root'
})
export class ExtinguishersService extends BaseServiceAPI<Extinguisher>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'extinguisher');
  }
}
