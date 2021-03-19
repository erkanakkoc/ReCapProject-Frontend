import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = environment.apiUrl+"brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

}
