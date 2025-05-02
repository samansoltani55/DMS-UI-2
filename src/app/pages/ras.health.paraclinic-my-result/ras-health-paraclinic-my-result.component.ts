import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth-service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { error } from 'console';
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
import { NbDialogService } from '@nebular/theme';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'ngx-ras-health',
  templateUrl: './ras-health-paraclinic-my-result.component.html',
  styleUrls:['./fileupload.css'],
  standalone:true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbSpinnerModule,
    //PdfViewerModule
  ],
})
export class RasHealthParaclinicResultComponent {
  title = 'Presentaion.Web.Angular';
  isLoggedIn: Boolean = false;
  isLoading: Boolean=false;
  link:string;
  mobile:string;
  paraClinicResult:ParaClinicResult;
  isloaded:Boolean = false;

  constructor(private _authService: AuthService, private _router: Router
    , private http: HttpClient ,private toastrService: NbToastrService
   ) {
     this._authService.loginChanged.subscribe(loggedIn => {
       this.isLoggedIn = loggedIn;
     });

     this.paraClinicResult=new ParaClinicResult();
   }

  //  itemToForm = () => {
  //   if(this.paraClinicResult === undefined) {return}

  // }

   ngOnInit() {
    this._authService.IsLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

  }
  getResult():Promise<void | Subscription> {
    
    return this._authService.GetAccessToken().then(token=>{
      this.isLoading=true;
      return this.http.get("http://84.241.4.148:7272/api/General/ParaclinicResult/V1/GetResult?linkPostfix="+this.link,
        {headers:{'Authorization': `Bearer ${token}`}
        // , responseType: 'blob'
      }
      ).subscribe((data:RasResponse) =>{
         //console.log(data);
        //  this.isLoading=false;
        //  if(data.succeeded == true){
          this.showToast("success","Success Get result","");
         this.paraClinicResult=data.data;
         this.isLoading=false;
         this.isloaded=true; 
        //  console.log("customerId="+data.data);
        //  return true;
        //  }
        //  else{
        //   this.showToast("danger","Failed result","");
        //   return false;
        //  }
      }
      ,(error:any)=>{
        this.isLoading=false;
        this.showToast("danger","Failed result","");
      });
    });
  }

  downloadFile(){
   // let blob: Blob = this.paraClinicResult.uploadedResultFiles[0].fileContent as Blob;
    
    const imageName = 'name.pdf';
const imageBlob = this.dataURItoBlob(this.paraClinicResult.uploadedResultFiles[0].fileContent);
const imageFile = new File([imageBlob], imageName, { type: 'application/pdf' });
  
 let url = window.URL.createObjectURL(imageFile);
     window.open(url);
}

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
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
  data:ParaClinicResult;
  messages:string[];
  succeeded:boolean;
}
class ParaClinicResult{

  resultID:string;
  paraclinicName:string;
  paraclinicPhone:string;
  parTrackingCode:string;
  examDate:string;
  resultDate:string;
  uploadDate:string;
  paraclinicType:string;
  paraclinicTypeDesc:string;
  patientName:string;
  patientFamily:string;
  patientUserName:string;
  uploadedResultFiles :fileResult[];
}
class fileResult{

                id:string;
                fileType:string;
                fileTypeName:string;
                fileName:string;
                fileContent;
}
 