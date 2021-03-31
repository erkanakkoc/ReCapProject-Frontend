import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordUpdateForm:FormGroup;
  currentUserId:number;

  constructor( private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createPasswordUpdateForm();
    this.currentUserId = this.authService.getUserId();
  }

  createPasswordUpdateForm(){
    this.passwordUpdateForm = this.formBuilder.group({
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required]
    })
  }

  changePassword(){
    if (this.passwordUpdateForm.valid){
      let passwordModel = Object.assign({userId:this.currentUserId},this.passwordUpdateForm.value);
      this.authService.changePassword(passwordModel).subscribe(response => {
        this.toastrService.success(response.message,"Successfully");
      },responseError => {
        this.toastrService.error(responseError.error,"Error");
      })
    }else{
      this.toastrService.error("Please Fill The Form Completely","Error")
    }
  }
}
