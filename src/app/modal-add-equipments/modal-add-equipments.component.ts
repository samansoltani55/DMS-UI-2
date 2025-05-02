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
  NbSelectModule,
 
} from '@nebular/theme';
import { AuthService } from '../auth-service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ThemeModule } from '../@theme/theme.module';
import { error } from 'console';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { WindowFormComponent } from '../pages/modal-overlays/window/window-form/window-form.component';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'ngx-modal-add-equipments',
  templateUrl: './modal-add-equipments.component.html',
  styleUrls: ['./modal-add-equipments.component.scss'],
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
    NbSelectModule,
    GoogleMapsModule
    
  ],
 // imports: [FormsModule,]
})
export class ModalAddEquipmentsComponent implements OnInit {
  newEquipments=new Equipments();
  zoom = 10;
  center: google.maps.LatLngLiteral = { lat: 35.6892, lng: 51.3890 }; 
  markerPosition: google.maps.LatLngLiteral | null = null;

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.newEquipments.lat=this.markerPosition.lat;
      this.newEquipments.lang=this.markerPosition.lng;
    }
    }
    
 
  ngOnInit(): void {
    this.newEquipments=new Equipments();
  }
  constructor(private http: HttpClient ,private toastrService: NbToastrService,private _router: Router){

  }

  saveEquipments():any {
 
  //return this._authService.GetAccessToken().then(token=>{
    //this.isLoading=true;
    return this.http.post("http://82.115.18.153:5000/Equipments",
      JSON.stringify(this.newEquipments),
      {headers:{'content-type':'application/json'}}
    ).subscribe((data:any) =>{
       //console.log(data);
       this.showToast("success","Success Add ","");

       
       return true;
    }
    ,(error:any)=>{
      //this.isLoading=false;
      this.showToast("danger","Failed " ,"");
    });
  //});
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
