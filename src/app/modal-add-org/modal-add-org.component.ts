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
@Component({
  selector: 'ngx-modal-add-org',
  templateUrl: './modal-add-org.component.html',
  styleUrls: ['./modal-add-org.component.scss'],
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
    NbSelectModule
    
  ],
 // imports: [FormsModule,]
})
export class ModalAddOrgComponent implements OnInit {
  newPlant=new Orgs();
  plantList=["ABNIROO","BASPARAN","FARAVARESH", "KIMIA"];
  ngOnInit(): void {
    this.newPlant=new Orgs();
  }
  constructor(private http: HttpClient ,private toastrService: NbToastrService,private _router: Router){

  }

  savePlant():any {
 
  //return this._authService.GetAccessToken().then(token=>{
    //this.isLoading=true;
    return this.http.post("http://localhost:5140/OrgChart",
      JSON.stringify(this.newPlant),
      {headers:{'content-type':'application/json'}}
    ).subscribe((data:any) =>{
       //console.log(data);
       this.showToast("success","Success Add ","");
       this._router.navigate(["/pages/org-chart"]);
       
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
class Orgs{
  orgName:string;
  orgDescription:string;
  isActive: boolean;
  plant:number;
  id: number;
}
