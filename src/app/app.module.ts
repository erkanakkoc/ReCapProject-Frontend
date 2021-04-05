import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { CustomerFilterPipePipe } from './pipes/customer-filter-pipe.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';

import { ToastrModule } from 'ngx-toastr';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './components/payment/payment.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserCardsComponent } from './components/user-cards/user-cards.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    NaviComponent,
    BrandComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    ColorFilterPipePipe,
    BrandFilterPipePipe,
    CarFilterPipePipe,
    CustomerFilterPipePipe,
    CarFilterComponent,
    PaymentComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarAddComponent,
    ColorListComponent,
    BrandListComponent,
    CarListComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    LoginComponent,
    RegisterComponent,
    RentalListComponent,
    ChangePasswordComponent,
    ProfileComponent,
    UserCardsComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule
    //NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
