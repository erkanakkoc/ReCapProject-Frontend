import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardNumber:number;
  firstName:string;
  lastName:string;
  expirationDate:string;
  cVV:number;
  rental:Rental;

  constructor(
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if (params["rental"]) {
        this.rental = JSON.parse(params["rental"]);
        
      }
    })
  }

  addRental(){
    let newPayment: Payment = {
      cardNumber:this.cardNumber,
      firstName:this.firstName,
      lastName:this.lastName,
      expirationDate:this.expirationDate,
      cVV: +this.cVV
    }
    this.paymentService.addPayment(newPayment);
    this.rentalService.addRental(this.rental);
    this.router.navigate(["cars/"]);

    
  }

}
