import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbSpinnerModule,
  NbStepperComponent
} from '@nebular/theme';
import { AuthService } from '../../auth-service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ThemeModule } from '../../@theme/theme.module';
import { error } from 'console';
import { FormBuilder, Validators } from '@angular/forms';
import { randomInt } from 'crypto';


@Component({
  selector: 'ngx-ras-paraclinic-register',
  templateUrl: './ras-paraclinic-register.component.html',
  styleUrls: ['./ras-paraclinic-register.component.scss', './fileupload.css'],
  standalone:true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSpinnerModule,

  ],
})
export class RasParaclinicRegisterComponent  implements OnInit{
  title = 'ارسال جواب آزمایش ';
  isLoggedIn: Boolean = false;
  key: string = "";
 
  isLoading: Boolean=false;

  newPersonId:string;
  mobile:string;
  otp:number;

  stepOnePassed=false;
  stepTwoPassed=false;
  //dateValue = new FormControl();

  constructor( private _router: Router
    , private http: HttpClient ,private toastrService: NbToastrService
    ,private fb: FormBuilder
   ) {

   }
ngOnInit() {
   }
  
   SendOTP() {
     console.log("getdata ---" );
    
     return this.http.post("http://84.241.4.148:9090/api/General/Person/V1/SendOTP?mobileNumber="+this.mobile
      ,""
     ).subscribe((data:RasResponse) =>{
        console.log(data);
        if(data.succeeded){
          this.stepOnePassed=true;
        }

      });
   }

   Register() {

    var body=new RegisterBody();
    body.name="new-user";
    body.email="";
    body.family="";
    body.otpCode=this.otp;
    body.password="asdsds#!@#22asPP";
    body.mobileNumber=this.mobile;
body.userName="new-username";

    console.log("getdata ---" );
   
    return this.http.post("http://84.241.4.148:9090/api/General/Person/V1/RegisterUser"
     ,JSON.stringify(body),{headers:{'content-type':'application/json'}}
    ).subscribe((data:RasResponse) =>{
       console.log(data);
       if(data.succeeded){
         this.stepOnePassed=true;
       }

     });
  }

// postContent():Promise<void | Subscription> {
//   var  body =new SendContentBody();
//   body.customerID=1;
//   body.personID=this.newPersonId;
//   body.parTrackingCode="1";
//   body.examDate="2024-09-25T04:43:11.001Z";
//   body.resultDate="2024-09-25T04:43:11.001Z";
//   body.docID="1";
//   body.par_Type=2;
//   console.log(this.fileGuid);
  
//   var resultContents:string[]= new Array(1);
//   resultContents[0]=this.fileGuid;

//   body.resultContents=resultContents;

//   return this._authService.GetAccessToken().then(token=>{
//     this.isLoading=true;
//     return this.http.post("http://84.241.4.148:7272/api/General/ParaclinicResult/V1/AddResult",
//       JSON.stringify(body),
//       {headers:{'Authorization': `Bearer ${token}`,'content-type':'application/json'}
//       // , responseType: 'blob'
//     }
//     ).subscribe((data:RasResponse) =>{
//        //console.log(data);
//        this.isLoading=false;
//        if(data.succeeded == true){
//        this.showToast("success","Success Add result","");

//        this._router.navigate(["/ras-health-sendresult"]);
//        console.log(data);
//        return true;
//        }
//        else{
//         this.showToast("danger","Failed result","");
//         return false;
//        }
//     }
//     ,(error:any)=>{
//       this.isLoading=false;
//       this.showToast("danger","Failed result","");
//     });
//   });
// }

private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: true,
    duration: 5000,
    hasIcon: true,
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    preventDuplicates: true,
  };
  const titleContent = title ? `. ${title}` : '';

  this.toastrService.show(
    body,
    ` ${titleContent}`,
    config);
}
}
class RasResponse{
   code:number;
   data:string;
   messages:string[];
   succeeded:boolean;
}

class RegisterBody{
  name;
  family;
  userName;
  mobileNumber;
  otpCode;
  password;
  email;
}
