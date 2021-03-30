import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient:HttpClient) { }

  getCarImages(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = environment.apiUrl+"carImages/getimagesbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  //-----------------------------------

  getCarsImages():Observable<ListResponseModel<CarImage>>{
    let newPath = environment.apiUrl + "carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(carId:number,imageFile:File):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append("carId",carId.toString());
    formData.append("Image",imageFile)

    //let newPath = environment.apiUrl + "carimages/add"
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "carimages/add",formData);
  }

  update(carId:number,imageFile:File,imageId:number):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append("carImageId",imageId.toString());
    formData.append("carId",carId.toString());
    formData.append("Image",imageFile)
    console.log(formData)

    //let newPath = environment.apiUrl + "carimages/update";
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "carimages/update",formData);
  }
}
