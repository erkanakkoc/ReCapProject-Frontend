import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:Car[]=[];
  carImages:CarImage[]=[];
  dataLoaded = false;
  imageBasePath = environment.baseUrl;

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private imageService:CarImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
        
      }
      this.getImagesByCarId();
     
    });
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getImagesByCarId(){
    
    this.imageService.getCarImages(this.activatedRoute.snapshot.params["carId"]).subscribe((response)=>{
      this.carImages=response.data;
      
    });
    }
}