import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  brands:Brand[];
  colors:Color[];
  imageAddForm:FormGroup;
  imageFiles:File[];
  savedCarId:number;


  constructor(private formBuilder:FormBuilder, 
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService, 
    private toastrService:ToastrService,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
    this.createCarImageAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      carName: ["",Validators.required],
      brandId: ["",Validators.required],
      colorId: ["",Validators.required],
      modelYear: ["",Validators.required],
      dailyPrice: ["",Validators.required],
      description: ["",Validators.required],
      findexPoint:["",Validators.required]
     // imagePath: ["",Validators.required]
    })
  }

  add(){
    if (this.carAddForm.valid) {
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success(response.message,"Successfully")
        this.savedCarId = response.data.carId;
        this.addImage()
        this.toastrService.success("Image(s) added.","Successfully")
      },responseError => {
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası");
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Hata");
    }
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors=response.data;
    })
  }

  createCarImageAddForm(){
    this.imageAddForm = this.formBuilder.group({
      carId:[this.savedCarId],
      file:["",Validators.required]
    })
  }

  uploadFile(event:any){
    this.imageFiles = event.target.files;
  }

  addImage(){
    if (this.imageAddForm.valid) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        this.carImageService.add(this.savedCarId,this.imageFiles[i]).subscribe(response => {
        }) 
      }
    }
  }
}