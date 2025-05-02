import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'ngx-signout-redirect-callback',
  templateUrl: './signout-redirect-callback.component.html',
  styleUrls: ['./signout-redirect-callback.component.scss']
})

export class SignoutRedirectCallbackComponent implements OnInit{
constructor(private _authService : AuthService,private _router : Router){
}

  ngOnInit(): void {
    this._authService.CompleteLogout().then(_=>{
      this._router.navigate(['/'],{replaceUrl:true})

    }
    );
  }

}
