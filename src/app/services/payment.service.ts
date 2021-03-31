import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel>{
    // let newPath = environment.apiUrl+"payments/add";
    // this.httpClient.post(newPath,payment).subscribe();
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "payments/add",payment);
  }

  checkPayment(payment:Payment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "payments/checkpayment",payment);
  }

}
