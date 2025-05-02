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
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'ngx-ras-paraclinic-list-of-my-result',
  templateUrl: './ras-paraclinic-list-of-my-result.component.html',
  styleUrls: ['./ras-paraclinic-list-of-my-result.component.scss', './fileupload.css'],
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
    Ng2SmartTableModule
    // NgPersianDatepickerModule,
    //   ReactiveFormsModule,
  ],
})
export class RasParaclinicListOfMyResultComponent  implements OnInit{
  title = ' Organization Chart ';
  isLoggedIn: Boolean = false;
  paraClinicResult:ParaClinicResult;
  isloaded:Boolean = false;
  isLoading: Boolean=false;
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right',
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye "  ></i>'}]
  },
    add: {
      addButtonContent: '<i class="nb-plus" style="height: 0px;"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      resultID: {
        title: 'resultID',
        type: 'number',
      },
      examDate: {
        title: 'examDate',
        type: 'string',
      },
      paraclinicName: {
        title: 'paraclinicName',
        type: 'string',
      },
      paraclinicTypeDesc: {
        title: 'paraclinicTypeDesc',
        type: 'string',
      },
      resultDate: {
        title: 'resultDate',
        type: 'string',
      },
      parTrackingCode: {
        title: 'parTrackingCode',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private _authService: AuthService, private _router: Router
    , private http: HttpClient ,private toastrService: NbToastrService
  
   ) {
    //  this._authService.loginChanged.subscribe(loggedIn => {
    //    this.isLoggedIn = loggedIn;
    //    const data = this.GetMyData();
    //  });

     const data = this.GetMyData();
   }
   GetMyData(){
    this.GetData().then(data=>{
      console.log(data);
    });
   }
   GetData():any {
     console.log("getdata ---" );
     //return this._authService.GetAccessToken().then(token=>{
     return this.http.get("http://84.241.4.148:9090/api/General/ParaclinicResult/V1/GetAllMyResults",
      // {headers:{'Authorization': `Bearer ${token}`}}
     )
     .subscribe((data:RasResponse) =>{
       console.log(data);
       this.source.load(data.data);
      });
   //});
   }
 
ngOnInit() {
     this._authService.IsLoggedIn().then(loggedIn => {
       this.isLoggedIn = loggedIn;
     });
   
   }


   onCustomAction(event) {
    switch ( event.action) {
      case 'viewrecord':
        this.viewRecord(event.data.linkPostfix);
        break;

    }
  }
  public viewRecord(formData: string) {
    this.getResult(formData).then(()=>{
      
    });
  }
  
   getResult(postfix :string ):Promise<void | Subscription> {
    
    return this._authService.GetAccessToken().then(token=>{
      this.isLoading=true;
      return this.http.get("http://84.241.4.148:9090/api/General/ParaclinicResult/V1/GetResult?linkPostfix="+postfix,
        {headers:{'Authorization': `Bearer ${token}`}
        // , responseType: 'blob'
      }
      ).subscribe((data:RasFileResponse) =>{
         //console.log(data);
        //  this.isLoading=false;
        //  if(data.succeeded == true){
          this.showToast("success","Success Get result","");
          this.paraClinicResult=data.data;
         this.isLoading=false;
         this.downloadFile();
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
    debugger
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
   data:any[];
   messages:string[];
   succeeded:boolean;
}
class RasFileResponse{
  code:number;
  data:ParaClinicResult;
  messages:string[];
  succeeded:boolean;
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
  linkPostfix:string;
}
class fileResult{

                id:string;
                fileType:string;
                fileTypeName:string;
                fileName:string;
                fileContent;
}
