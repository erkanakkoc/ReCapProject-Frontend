import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"cars/update/:carId", component:CarUpdateComponent},
  {path:"cars/list", component:CarListComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"rentals", component:RentalComponent},
  {path:"rental/:carId", component:RentalComponent},
  {path:"colors", component:ColorComponent},
  {path:"colors/list", component:ColorListComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"customers", component:CustomerComponent},
  {path:"brands", component:BrandComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"brands/list", component:BrandListComponent},
  {path:"cars/detail/:carId", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"cars/filter/brand/:brandId",component:CarComponent},
  {path:"cars/filter/color/:colorId",component:CarComponent},
  {path:"cars/rental/payment/:rental",component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
