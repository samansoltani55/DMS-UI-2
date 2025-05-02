import { Injectable } from '@angular/core';
import { CanActivate,Router, UrlTree } from '@angular/router';
import { AuthService } from './auth-service.component';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log("AuthGuard--constructor");
  }

  canActivate(): Promise<boolean> {
    console.log("AuthGuard--canActivate");
    return this.checkAuth().then(function(data):boolean {
      return data;
    });
  }
   
    
  private  checkAuth():Promise<boolean> {
    console.log("AuthGuard--checkAuth");
    return  this.authService.IsLoggedIn().then(
        (data)=> { 
          if(data){
          console.log("data= "+data);
        console.log("AuthGuard--checkAuth--true");
            return true;
          }
          else{
            console.log("AuthGuard--checkAuth--false"); 
            //this.router.navigate(['/login']);
           this.authService.Login();
           return false;
          }
    });
     
    }

}