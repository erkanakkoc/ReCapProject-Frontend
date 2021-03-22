import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment){
    let newPath = environment.apiUrl+"payments/add";
    this.httpClient.post(newPath,payment).subscribe();
  }


}
