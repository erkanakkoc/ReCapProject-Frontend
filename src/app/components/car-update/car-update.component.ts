import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  errorMessages:string[]
  cars:Car[]
  carId:number
  colors:Color[]
  brands:Brand[]
  constructor(private formBuilder:FormBuilder,private carService:CarService,private toastrService:ToastrService,
    private colorService:ColorService,private brandService:BrandService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.carId =parseInt(params["carId"])
        this.getCars();
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    })
    
  }


  createCarUpdateForm(){
   this.carUpdateForm = this.formBuilder.group({
      carId:this.carId,
      brandId:["",Validators.required],
      carName:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
   });
  }
  
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
     })
  }

  update(){
    console.log(this.carUpdateForm)
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({},this.carUpdateForm.value);
      console.log(carModel)
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success("Car updated","Success")
      },responseError=>{
        console.log(responseError)
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
            this.errorMessages = responseError.error.ValidationErrors[i].ErrorMessage
            console.log(this.errorMessages)
          }
        }
      })
    }else{
      this.toastrService.error("Form is invalid","Invalid")
    }
  }
}