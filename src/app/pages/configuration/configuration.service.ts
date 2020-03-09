import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { Configuration } from 'src/app/models/configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseServiceAPI<Configuration>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'configuration');
  }

}
