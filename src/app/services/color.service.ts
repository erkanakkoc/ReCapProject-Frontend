import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = environment.apiUrl+"colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

}
