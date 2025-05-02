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
  selector: 'ngx-ras-paraclinic-send-my-result',
  templateUrl: './ras-paraclinic-send-result.component.html',
  styleUrls: ['./ras-paraclinic-send-result.component.scss', './fileupload.css'],
  standalone:true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSpinnerModule,
    // NgPersianDatepickerModule,
    //   ReactiveFormsModule,
  ],
})
export class RasParaclinicSendMyResultComponent  implements OnInit{
  title = 'ارسال جواب آزمایش ';
  isLoggedIn: Boolean = false;
  key: string = "";
  fileGuid:string;
  isLoading: Boolean=false;
  isFileSelected: Boolean=false;
  customerName:string;
  customerId:string;
  newPersonId:string;
  fileToUpload: File | null = null;
  newMyResult =new MyResult();
  stepOnePassed=false;
  stepTwoPassed=false;
  //dateValue = new FormControl();

  constructor(private _authService: AuthService, private _router: Router
    , private http: HttpClient ,private toastrService: NbToastrService
    ,private fb: FormBuilder
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
     this.newMyResult.resultContents=new Array<string>();
   }
  
handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(files.item(0)!=null){
      this.isFileSelected=true;
    }
}
uploadFileToActivity() {
  
  this.postFile(this.fileToUpload).then(data => {
    console.log(data)

    // do something, if upload success
    });
}
postFile(fileToUpload: File):Promise<void | Subscription> {
  // const endpoint = 'your-destination-url';
   const formData: FormData = new FormData();
  // var HeadersConfig;
   formData.append('file', fileToUpload, fileToUpload.name);
  // return this.http
  //   .post(endpoint, formData, { headers: HeadersConfig })
  //   .subscribe(data => { return true; },error=>{console.log(error);return false;});
  // }
  
  return this._authService.GetAccessToken().then(token=>{
    this.isLoading=true;
    return this.http.post("http://84.241.4.148:9090/api/General/ParaclinicResult/V1/AddContent",
      formData,
      {headers:{'Authorization': `Bearer ${token}`}
      // , responseType: 'blob'
    }
    ).subscribe((data:RasResponse) =>{
       //console.log(data);
       debugger
       this.isLoading=false;
       if(data.succeeded == true){
        
       this.showToast("success","Success Add ","");
       this.fileGuid=data.data;
       this.newMyResult.resultContents.push(this.fileGuid);
        this.stepOnePassed=true;
       console.log(this.fileGuid);
       return true;
       }
       else{
        this.showToast("danger","Failed "+ data,"");
        return false;
       }
      
    }
    ,(error:any)=>{
      this.isLoading=false;
      this.showToast("danger","Failed "+error,"");
    });
  });
}

postCustomer():Promise<void | Subscription> {
  var  body =new Customer();
  body.customerName=this.customerName;
  body.customerType=1;

  return this._authService.GetAccessToken().then(token=>{
    this.isLoading=true;
    return this.http.post("http://84.241.4.148:9090/api/General/Customer/V1/AddCust",
      JSON.stringify(body),
      {headers:{'Authorization': `Bearer ${token}`,'content-type':'application/json'}
      // , responseType: 'blob'
    }
    ).subscribe((data:RasResponse) =>{
       //console.log(data);
       this.isLoading=false;
       if(data.succeeded == true){
       this.showToast("success","Success Add result","");
       this.customerId=data.data;
       console.log("customerId="+data.data);
       return true;
       }
       else{
        this.showToast("danger","Failed result","");
        return false;
       }
    }
    ,(error:any)=>{
      this.isLoading=false;
      this.showToast("danger","Failed result","");
    });
  });
}

 
postMyResult():Promise<void | Subscription> {
 
  return this._authService.GetAccessToken().then(token=>{
    this.isLoading=true;
    return this.http.post("http://84.241.4.148:9090/api/General/ParaclinicResult/V1/AddMyResult",
      JSON.stringify(this.newMyResult),
      {headers:{'Authorization': `Bearer ${token}`,'content-type':'application/json'}
      // , responseType: 'blob'
    }
    ).subscribe((data:RasResponse) =>{
       //console.log(data);
       this.isLoading=false;
       if(data.succeeded == true){
       this.showToast("success","Success Add My Result","");
       this.newPersonId=data.data;
       this.stepOnePassed=true;
       this._router.navigate(["/pages/ras-health-list-of-my-result"]);
       console.log("customerId="+data.data);
       return true;
       }
       else{
        this.showToast("danger","Failed My Result","");
        return false;
       }
    }
    ,(error:any)=>{
      
      this.isLoading=false;
      this.showToast("danger","Failed My Result" +error,"");
    });
  });
}

postContent():Promise<void | Subscription> {
  var  body =new SendContentBody();
  body.customerID=1;
  body.personID=this.newPersonId;
  body.parTrackingCode="1";
  body.examDate="2024-09-25T04:43:11.001Z";
  body.resultDate="2024-09-25T04:43:11.001Z";
  body.docID="1";
  body.par_Type=2;
  console.log(this.fileGuid);
  
  var resultContents:string[]= new Array(1);
  resultContents[0]=this.fileGuid;

  body.resultContents=resultContents;

  return this._authService.GetAccessToken().then(token=>{
    this.isLoading=true;
    return this.http.post("http://84.241.4.148:7272/api/General/ParaclinicResult/V1/AddResult",
      JSON.stringify(body),
      {headers:{'Authorization': `Bearer ${token}`,'content-type':'application/json'}
      // , responseType: 'blob'
    }
    ).subscribe((data:RasResponse) =>{
       //console.log(data);
       this.isLoading=false;
       if(data.succeeded == true){
       this.showToast("success","Success Add result","");

       this._router.navigate(["/ras-health-sendresult"]);
       console.log(data);
       return true;
       }
       else{
        this.showToast("danger","Failed result","");
        return false;
       }
    }
    ,(error:any)=>{
      this.isLoading=false;
      this.showToast("danger","Failed result","");
    });
  });
}

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

class SendContentBody{
  personID;
  customerID;
  parTrackingCode;
  examDate;
  resultDate;
  docID;
  par_Type;
  resultContents:string[];
}

class Customer{

    customerName: string;
    customerType: number;
  
}

class MyResult{
  
  customerID: number;
  parTrackingCode: string;
  examDate: string;
  resultDate: string;
  docID: string;
  par_Type: BigInteger;
  resultContents:Array<string>;
  
}