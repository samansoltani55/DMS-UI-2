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
import { ModalAddEquipmentsComponent } from '../modal-add-equipments/modal-add-equipments.component';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.scss', ],
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
    GoogleMapsModule
    
  ],
})
export class EquipmentsListComponent  implements OnInit{
  title = 'Equipments';
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

  equipmentsList:Equipments[];

  zoom = 9;
  center: google.maps.LatLngLiteral = { lat: 35.6892, lng: 51.3890 }; 
  markerPosition: google.maps.LatLngLiteral | null = null;

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
      equipmentName: {
        title: 'Equipment Name',
        type: 'string',
      },
      equipmentDescription: {
        title: 'Equipment Description',
        type: 'string',
      },
      lat: {
        title: 'lat',
        type: 'number',
      },
      lang: {
        title: 'lang',
        type: 'number',
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
     return this.http.get("http://82.115.18.153:5000/Equipments",
      // {headers:{'Authorization': `Bearer ${token}`}}
     )
     .subscribe((data:Equipments[]) =>{
       console.log("03-"+data[0]);
       this.equipmentsList=data;
       this.source.load(data);
      });
   //});
   }

   openWindowForm() {
    this.windowService.open(ModalAddEquipmentsComponent, { title: `Add Equipments` })
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

class Equipments{

  equipmentName:string;
  equipmentDescription:string;
  isActive: boolean;
  id: number;
  lat:number;
  lang:number;
}