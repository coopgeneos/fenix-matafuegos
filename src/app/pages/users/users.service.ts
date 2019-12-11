import { Injectable } from '@angular/core';
import { BaseServiceAPI } from '../../commons/base-service-api';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseServiceAPI<User>{

  constructor(protected httpClient: HttpClient) { 
    super(httpClient, 'user');
  }
}
