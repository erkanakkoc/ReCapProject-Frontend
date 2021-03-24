import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand : Brand;
  dataLoaded = false;
  filterText ="";


  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  } 

  getBrands(){
     this.brandService.getBrands().subscribe(response=>{
       this.brands=response.data
       this.dataLoaded=true;
     })
  }

  // setCurrentBrand(brand:Brand){
  //   this.currentBrand = brand;
  // }

  // getCurrentBrandClass(brand:Brand){
  //   if(brand==this.currentBrand){
  //     return "list-group-item active"
  //   } else {
  //     return "list-group-item"
  //   }
  // }

  // getAllBrandClass(){
  //   if(!this.currentBrand){
  //     return "list-group-item active"
  //   }else{
  //     return "list-group-item"
  //   }
  // }

}