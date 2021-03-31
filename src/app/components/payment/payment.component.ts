import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentalAddForm:FormGroup
  rental:Rental;
  isChecked =false;

  constructor(
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private cardDetailService:CardService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if (params["rental"]) {
        this.rental = JSON.parse(params["rental"]);
        this.createRentalAddForm();
      }
    })
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cVV:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  CardSave(){
    if (this.isChecked == true) {
      let cardModel = Object.assign({userId:this.authService.getUserId()},this.rentalAddForm.value)
      this.cardDetailService.saveCard(cardModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      });
    }
  }

  addRental(){
    if (this.rentalAddForm.valid) {
      let addRentalModel = Object.assign({},this.rentalAddForm.value)
      this.rentalService.addRental(this.rental).subscribe(response => {
        this.toastrService.success(response.message,"Successfully")
        this.CardSave();
        this.router.navigate(["cars/"])
      },responseError => {
        this.toastrService.error(responseError.error,"Error")
      });
    }else{
      this.toastrService.error("Please Fill The Form Completely.","Error")
    }
  }

  checkPayment(){
    let checkPaymentModel = Object.assign({},this.rentalAddForm.value)
    this.paymentService.checkPayment(checkPaymentModel).subscribe(response => {
        this.toastrService.success(response.message,"Successfully")
        this.addRental();
        this.updateUserFindex();
    },responseError => {
      this.toastrService.error(responseError.error,"Error");
    })
  }
  
  updateUserFindex(){
    this.userService.updateUserFindex(this.authService.getUserId()).subscribe(response => {
      this.toastrService.info(response.message,"Information")
    })
  }
}
