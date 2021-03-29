import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  update(user:User):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "users/updateinfo" 
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  getByUserId(id:number):Observable<SingleResponseModel<User>>{
    let newPath = environment.apiUrl + "users/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }


}
