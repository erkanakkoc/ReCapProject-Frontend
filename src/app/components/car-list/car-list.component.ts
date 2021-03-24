import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars:Car[] = [];
  carId:number;
  
  dataLoaded = false;


  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsBySelect(params["brandId"],params["colorId"])
      } else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      } else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      } else{
          this.getCars()
      }

    })

  }

  getCars(){
     this.carService.getCars().subscribe(response=>{
       this.cars=response.data
       this.dataLoaded=true;
     })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
 }

 getCarsByColor(colorId:number){
  this.carService.getCarsByColor(colorId).subscribe(response=>{
    this.cars=response.data
    this.dataLoaded=true;
  })
}

  getCarsBySelect(brandId:number, colorId:number){
   this.carService.getCarsBySelect(brandId,colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
     if(this.cars.length == 0){
        this.toastr.info('Arama sonuçunuza ait bir araç bulunmamaktadır.', 'Arama Sonucu');
     }
    })
  }
}