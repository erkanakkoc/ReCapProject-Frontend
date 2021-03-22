import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:Car[]=[];
  rentals:Rental[]=[];
  carImages:CarImage[]=[];
  currentImage : CarImage;
  dataLoaded = false;
  imageBasePath = environment.baseUrl;

  constructor(
    private carService:CarService,
    private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private imageService:CarImageService,
    private rentalService:RentalService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
        this.getImagesByCarId(params["carId"])
      }
      //this.getImagesByCarId();
     
    });
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getImagesByCarId(carId:number){
    
    // this.imageService.getCarImages(this.activatedRoute.snapshot.params["carId"]).subscribe((response)=>{
    //   this.carImages=response.data;      
    // });

    this.imageService.getCarImages(carId).subscribe(response => {
      this.carImages=response.data;
      this.dataLoaded=true;
    })
  }

  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }

}