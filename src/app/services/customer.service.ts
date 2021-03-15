import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Customer>>{
    let newPath = environment.apiUrl+"customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

}
