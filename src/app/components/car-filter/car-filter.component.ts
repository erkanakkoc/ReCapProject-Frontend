import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  constructor(
    private brandService:BrandService, 
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService
    ) { }

  brands: Brand[] = [];
  colors: Color[] = [];
  brandFilter: Number;
  colorFilter: Number;

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      //this.dataLoaded = true;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      // this.dataLoaded = true;
    });
  }
  getSelectedBrand(brand: Brand) {
    if (brand.brandId == this.brandFilter)
      return true;
    else
      return false;
  }
  getSelectedColor(color: Color) {
    if (color.colorId == this.colorFilter)
      return true;
    else
      return false;
  }

  IsCurrentColorNull(){
    if(this.colorFilter){
      return true;
    }else{
      return false;
    }
  }

  IsCurrentBrandNull(){
    if(this.brandFilter){
      return true;
    }else{
      return false;
    }
  }

  GetRouterLink(){
    if(this.colorFilter && this.brandFilter){
      return "/cars/filter/brand/"+this.brandFilter +"/color/" +this.colorFilter;
    }else if(this.brandFilter){
      return "/cars/filter/brand/" +this.brandFilter;
    }else if(this.colorFilter){
      return "/cars/filter/color/" +this.colorFilter;
    }else{
      return "/cars";
    }
  }
}
