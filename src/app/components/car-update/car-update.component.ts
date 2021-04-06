import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  // carUpdateForm:FormGroup;
  // errorMessages:string[]
  // cars:Car[]
  // carId:number
  // colors:Color[]
  // brands:Brand[]


  carUpdateForm:FormGroup;
  imageUpdateForm:FormGroup;
  images:CarImage[];
  car:Car
  brands:Brand[];
  colors:Color[];
  carId:number;
  carImages:CarImage[];
  imageBasePath = environment.baseUrl
  carImageDefault= environment.baseUrl+"/default.jpg"
  imageFile:File;
  currentCarImageId:number;




  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private brandService:BrandService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.carId =parseInt(params["carId"])
        this.getBrands();
        this.getColors();
        this.getCarDetail(this.carId)
        this.createCarUpdateForm();
        this.createImageUpdateForm();
        this.getCarImagesByCarId();
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
      description:["",Validators.required],
      findexPoint:["",Validators.required]
   });
  }
  
  getCarDetail(carId:number){
    this.carService.getCarDetail(carId).subscribe(response => {
      this.car = response.data[0];
      this.carUpdateForm.patchValue({
        description:this.car.description,
        carName:this.car.carName,
        modelYear:this.car.modelYear,
        dailyPrice:this.car.dailyPrice,
        findexPoint:this.car.findexPoint
      })
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
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error");
          }
        }
      })
    }else{
      this.toastrService.error("Form is invalid","Invalid")
    }
  }
  createImageUpdateForm(){
    this.imageUpdateForm = this.formBuilder.group({
      carId:[this.carId],
      file:["",Validators.required]
    })
  }

  uploadFile(event:any){
    this.imageFile = event.target.files[0]
  }

  getCarImagesByCarId(){
    this.carImageService.getCarImages(this.carId).subscribe(response => {
      this.carImages = response.data;
    })
  }

  updateImage(){
    if (this.imageUpdateForm.valid) {
      this.carImageService.update(this.carId,this.imageFile,this.currentCarImageId).subscribe(response => {
        this.toastrService.success(response.message,"Successfully")
      })
    }
  }

  setCurrentCarImageId(image:CarImage){
    this.currentCarImageId = image.id;
    console.log(this.currentCarImageId)
  }

  getCurrentImageClass(image:CarImage){
    if (this.currentCarImageId === image.id) {
      return "border border-danger";
    }
    return "";
  }
}