import { Injectable } from '@angular/core';
import { BaseServiceAPI } from 'src/app/commons/base-service-api';
import { HttpClient } from '@angular/common/http';
import { Extinguisher } from 'src/app/models/extinguisher';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExtinguishersService extends BaseServiceAPI<Extinguisher>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'extinguisher');
  }

  print(id: string) : Observable<any> {
    return this.httpClient.get(environment.api_url+"extinguisher/print?id="+id)
  }

  getAllMarks() : Observable<any> {
    return this.httpClient.get(environment.api_url+"mark")
  }
}
