import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userUpdateForm:FormGroup;
  customerUpdateForm:FormGroup;
  user:User;
  customer:Customer;
  findex:number;

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.createCustomerUpdateForm();
    this.getUser();
    this.getCustomer();
    this.getUserFindex();
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required]
    })
  }

  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      companyName:["",Validators.required]
    })
  }

  userUpdate(){
    if (this.userUpdateForm.valid) {
      let user = Object.assign({id:this.user.userId}, this.userUpdateForm.value)
      this.userService.update(user).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı");
      },responseError => {
        this.toastrService.error(responseError.error,"Hata")
      })
    }else{
      this.toastrService.error("Lütfen formu tamamen doldurunuz","Hata")
    }
  }

  getUser(){
    this.userService.getByUserId(this.authService.getUserId()).subscribe(response => {
      this.user = response.data;
      this.userUpdateForm.patchValue(response.data)
    })
  }

  getCustomer(){
    this.customerService.getCustomerByUserId(this.authService.getUserId()).subscribe(response => {
      this.customer = response.data;
      this.customerUpdateForm.patchValue(response.data)
    })
  }

  customerUpdate(){
    if (this.customerUpdateForm.valid) {
      let customerModel = Object.assign({id:this.customer.customerId,userId:this.customer.userId},this.customerUpdateForm.value)
      this.customerService.update(customerModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı");
      },responseError => {
        this.toastrService.error(responseError.error,"Hata")
      })
    }else{
      this.toastrService.error("Lütfen formu tamamen doldurunuz","Hata")
    }
  }

  getUserFindex(){
    this.userService.getUserFindexByUserId(this.authService.getUserId()).subscribe(response => {
      this.findex = response.data.findex;
      console.log(response.data.findex)
    })
  }

}