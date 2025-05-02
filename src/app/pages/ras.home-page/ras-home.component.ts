import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth-service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'ngx-ras-home',
  templateUrl: './ras-home.component.html',
  styleUrls:[
    './ras-home.component.css'
    ,'./responsive.css']
})

export class RasHomeComponent {
  title = 'Presentaion.Web.Angular';
  isLoggedIn: Boolean = false;
  key: string = "";

  constructor(private _authService: AuthService, private _router: Router
    , private http: HttpClient
   ) {
     this._authService.loginChanged.subscribe(loggedIn => {
       this.isLoggedIn = loggedIn;
     });
   }
   GetData() {
     console.log("getdata ---" + this.key);
  //    return this._authService.GetAccessToken().then(token=>{
  //    return this.http.get("https://localhost:44352/api/DownloadTestResult/"+this.key,
  //      {headers:{'Authorization': `Bearer ${token}`}, responseType: 'blob'}
  //    ).subscribe(data => saveAs(data));
  //  });
   }
 
   ngOnInit() {
     this._authService.IsLoggedIn().then(loggedIn => {
       this.isLoggedIn = loggedIn;
     });
   }
   Login() {
     this._authService.Login();
   }
   LogOut() {
     console.info("Log out ");
     this._authService.Logout();
   }
   
}
