import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  car:Car
  brands:Brand[];
  colors:Color[];
  carId:number;
  carImages:CarImage[];
  carImageDefault=environment.baseUrl+"/default.jpg"
  imageUrl=environment.baseUrl


  constructor(private formBuilder:FormBuilder, private carService:CarService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.carId],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }

  update(){
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({},this.carUpdateForm.value);
      console.log(carModel.id)
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      },responseError => {
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası");
          }
        }
      })
    }else{
      this.toastrService.error("Form bilgileri hatalı","Hata")
    }
  }

}
