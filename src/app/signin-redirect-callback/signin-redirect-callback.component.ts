import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-signin-redirect-callback',
  templateUrl: './signin-redirect-callback.component.html',
  styleUrls: ['./signin-redirect-callback.component.scss']
})

export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    console.log('SigninRedirectCallback');
    debugger;
    this._authService.completeLogin().then(user => {
      this._router.navigate(['/pages'], { replaceUrl: true });
    })
  }
}
