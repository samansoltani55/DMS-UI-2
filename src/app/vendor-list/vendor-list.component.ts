import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  NbStepperComponent,
  NbWindowService,
 
} from '@nebular/theme';
import { AuthService } from '../auth-service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ThemeModule } from '../@theme/theme.module';
import { error } from 'console';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';

import { ModalAddVendorComponent } from '../modal-add-vendor/modal-add-vendor.component';

@Component({
  selector: 'vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss', ],
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
    Ng2SmartTableModule,
    
  ],
})
export class VendorListComponent  implements OnInit{
  title = 'Vendors';
  isLoggedIn: Boolean = false;
  key: string = "";
  fileGuid:string;
  isLoading: Boolean=false;
  isFileSelected: Boolean=false;
  customerName:string;
  customerId:string;
  newPersonId:string;
  fileToUpload: File | null = null;
  stepOnePassed=false;
  stepTwoPassed=false;

  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right',
      // custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye "  ></i>'}]
  },
    // add: {
    //   addButtonContent: '<i class="nb-plus" style="height: 0px;"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      vendorName: {
        title: 'VendorName',
        type: 'string',
      },
      vendorDescription: {
        title: 'VendorDescription',
        type: 'string',
      },
      
    },
  };

  constructor(private _authService: AuthService, private _router: Router
    , private http: HttpClient ,private toastrService: NbToastrService
    ,private fb: FormBuilder,private windowService: NbWindowService
   ) {
    //  this._authService.loginChanged.subscribe(loggedIn => {
    //    this.isLoggedIn = loggedIn;
    //  });
   }
 
ngOnInit() {
    //  this._authService.IsLoggedIn().then(loggedIn => {
    //    this.isLoggedIn = loggedIn;
    //  });
    console.log("00-");
    this.GetMyData();
   }
   GetMyData(){
    this.GetData();
   }
   GetData():any {
     console.log("02- ---" );
     //return this._authService.GetAccessToken().then(token=>{
     return this.http.get("http://82.115.18.153:5000/Vendor",
      // {headers:{'Authorization': `Bearer ${token}`}}
     )
     .subscribe((data:Vendor[]) =>{
       console.log("03-"+data[0]);
       this.source.load(data);
      });
   //});
   }

   openWindowForm() {
    this.windowService.open(ModalAddVendorComponent, { title: `Add Vendor` })
    .onClose.subscribe(()=>{
      this.GetMyData();
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

  class Vendor{

    vendorName:string;
    vendorDescription:string;
    isActive: boolean;
    id: number;
}