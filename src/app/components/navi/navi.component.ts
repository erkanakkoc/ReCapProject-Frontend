import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  
  homePage = environment.baseUrl
  currentUserId:number;
  user:User;

  constructor(private authService:AuthService,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.getUserDetail();

  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  logOut(){
    this.localStorageService.clean();
    this.router.navigate([""])
  }
  getUserDetail(){
    this.userService.getByUserId(this.currentUserId).subscribe(response => {
      this.user = response.data;
    });
  }

}
