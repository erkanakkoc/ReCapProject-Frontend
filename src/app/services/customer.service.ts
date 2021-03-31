import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = environment.apiUrl+"customers/getcustomerdetails"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath = environment.apiUrl + "customers/getbyuserid?id=" + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "customers/update";
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }
}
