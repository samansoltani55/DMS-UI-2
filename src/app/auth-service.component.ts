import { Injectable } from '@angular/core';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userManager: UserManager;
  private _user: User | null = null;
  private _loginChangedSubject = new Subject<Boolean>;
  loginChanged = this._loginChangedSubject.asObservable();

  constructor() {
    var stsSetings = {
      authority: "",
      
      client_id: "aaoDMdE3ZVaARmqMSgAfh9rvgFQa",
      redirect_uri: "http://localhost:4200/signin-callback",
      scope: "my-api-1-scope-1 openid profile roles",
      response_type: "code",
      post_logout_redirect_uri:'', 
      userStore: new WebStorageStateStore({ store: window.localStorage })
    };
    
    this._userManager = new UserManager(stsSetings);

  }
  Login() {
    return this._userManager.signinRedirect();
  }

  completeLogin() {
    console.log('completeLogin');
    debugger;
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  IsLoggedIn(): Promise<Boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;
      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      this._user = user;
      return userCurrent;
    });
  }
  // IsLoggedIn2(): Boolean {
  //     this._userManager.getUser().then(user => { 
  //     const userCurrent = !!user && !user.expired;
  //     if (this._user !== user) {
  //       this._loginChangedSubject.next(userCurrent);
  //     }
  //     this._user = user;
  //     Promise.resolve(userCurrent);
  //     return userCurrent;
  //   });
  // }
  
  Logout() {
    return this._userManager.signoutRedirectCallback();
  }

  CompleteLogout() {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }
  GetAccessToken() {
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        console.log('GetAccessToken--' + user.access_token);
        return user.access_token;
      }
      else { return null; }
    });
  }
}
