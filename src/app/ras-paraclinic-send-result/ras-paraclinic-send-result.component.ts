import { Component, OnInit ,ViewChild, Input } from '@angular/core';
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

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { AuthService } from '../auth-service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ThemeModule } from '../@theme/theme.module';
import { error } from 'console';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { WindowFormComponent } from '../pages/modal-overlays/window/window-form/window-form.component';
import { ModalAddOrgComponent } from '../modal-add-org/modal-add-org.component';

@Component({
  selector: 'ngx-ras-paraclinic-send-result',
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
    Ng2SmartTableModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class OrganizationChartComponent  implements OnInit{
  title = 'Organization Chart';
  isLoggedIn: Boolean = false;
  key: string = "";
  fileGuid:string;
  isLoading: Boolean=false;
  isFileSelected: Boolean=false;
  customerName:string;
  customerId:string;
  newPersonId:string;
  fileToUpload: File | null = null;
  newPerson =new Person();
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
        title: 'PlantID',
        type: 'number',
      },
      plant: {
        title: 'plant',
        type: 'string',
      },
      orgDescription: {
        title: 'Plant',
        type: 'string',
      },
      
    },
  };

  ////////////////////////////
  private transformer = (node: FoodNode, level: number, parent?: FlatNode): FlatNode => ({
    name: node.name,
    level,
    expandable: !!node.children && node.children.length > 0,
    parent
  });

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node: FoodNode, level: number) => this.transformer(node, level),
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  data: FoodNode[] = [
    {
      name: 'Fruits',
      children: [{ name: 'Apple' }, { name: 'Banana' }]
    },
    {
      name: 'Vegetables',
      children: [{ name: 'Tomato' }, { name: 'Potato' }]
    }
  ];




  hasChild = (_: number, node: FlatNode) => node.expandable;

  addChild(node: FlatNode) {
    const parent = this.findNodeInData(this.data, node.name);
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push({ name: 'New Node' });
      this.refreshTree();
    }
  }

  deleteNode(node: FlatNode) {
    this.removeNode(this.data, node.name);
    this.refreshTree();
  }

  refreshTree() {
    this.dataSource.data = JSON.parse(JSON.stringify(this.data));
    this.treeControl.expandAll(); // optional: expand tree to show changes
  }

  private findNodeInData(data: FoodNode[], name: string): FoodNode | null {
    for (const node of data) {
      if (node.name === name) return node;
      if (node.children) {
        const found = this.findNodeInData(node.children, name);
        if (found) return found;
      }
    }
    return null;
  }

  private removeNode(data: FoodNode[], name: string): boolean {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        data.splice(i, 1);
        return true;
      }
      if (data[i].children) {
        const removed = this.removeNode(data[i].children, name);
        if (removed) {
          if (data[i].children.length === 0) delete data[i].children;
          return true;
        }
      }
    }
    return false;
  }
  ///////////////////////////
  

  constructor(private _authService: AuthService, private _router: Router
    , private http: HttpClient ,private toastrService: NbToastrService
    ,private fb: FormBuilder,private windowService: NbWindowService
   ) {
    this.dataSource.data = this.data;
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
     return this.http.get("http://82.115.18.153:5000/OrgChart",
      // {headers:{'Authorization': `Bearer ${token}`}}
     )
     .subscribe((data:Orgs[]) =>{
       console.log("03-"+data[0]);
       this.source.load(data);
      });
   //});
   }

   openWindowForm() {
    this.windowService.open(ModalAddOrgComponent, { title: `Add Plant` })
    .onClose.subscribe(()=>{
      this.GetMyData();
    });
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
    return this.http.post("http://84.241.4.148:7272/api/General/ParaclinicResult/V1/AddContent",
      formData,
      {headers:{'Authorization': `Bearer ${token}`}
      // , responseType: 'blob'
    }
    ).subscribe((data:RasResponse) =>{
       //console.log(data);
       this.isLoading=false;
       if(data.succeeded == true){
        
       this.showToast("success","Success Add ","");
       this.fileGuid=data.data;
        this.stepOnePassed=true;
       console.log(this.fileGuid);
       return true;
       }
       else{
        this.showToast("danger","Failed ","");
        return false;
       }
      
    }
    ,(error:any)=>{
      this.isLoading=false;
      this.showToast("danger","Failed ","");
    });
  });
}

postCustomer():Promise<void | Subscription> {
  var  body =new Customer();
  body.customerName=this.customerName;
  body.customerType=1;

  return this._authService.GetAccessToken().then(token=>{
    this.isLoading=true;
    return this.http.post("http://84.241.4.148:7272/api/General/Customer/V1/AddCust",
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

 
postPerson():Promise<void | Subscription> {
  var  body =new Person();
  body.personName=this.newPerson.personName;
  body.mobile=this.newPerson.mobile;
  body.personFamily=this.newPerson.personFamily;
  body.nationalCode=this.newPerson.nationalCode;
  body.userName=this.newPerson.userName;

  return this._authService.GetAccessToken().then(token=>{
    this.isLoading=true;
    return this.http.post("http://84.241.4.148:7272/api/General/Person/V1/Add",
      JSON.stringify(body),
      {headers:{'Authorization': `Bearer ${token}`,'content-type':'application/json'}
      // , responseType: 'blob'
    }
    ).subscribe((data:RasResponse) =>{
       //console.log(data);
       this.isLoading=false;
       if(data.succeeded == true){
       this.showToast("success","Success Add Person","");
       this.newPersonId=data.data;
       this.stepTwoPassed=true;
       console.log("customerId="+data.data);
       return true;
       }
       else{
        this.showToast("danger","Failed Person","");
        return false;
       }
    }
    ,(error:any)=>{
      this.isLoading=false;
      this.showToast("danger","Failed Person","");
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

class Person{
  
    personName: string;
    personFamily: string;
    mobile: string;
    nationalCode: string;
    userName: string;
  
}

class OrgResponse{
  orgs:Orgs[];
}
  class Orgs{

    orgName:string;
    orgDescription:string;
    isActive: boolean;
    plant:number;
    id: number;
}
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{ name: 'Apple' }, { name: 'Banana' }]
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }]
//       },
//       {
//         name: 'Orange',
//         children: [{ name: 'Pumpkins' }, { name: 'Carrots' }]
//       }
//     ]
//   }
// ];

// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }


// const INITIAL_TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruits',
//     children: [{ name: 'Apple' }, { name: 'Banana' }]
//   },
//   {
//     name: 'Vegetables',
//     children: [{ name: 'Carrot' }, { name: 'Lettuce' }]
//   }
// ];

// interface FlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
//   parent?: FlatNode;
// }
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const INITIAL_TREE_DATA: FoodNode[] = [
  {
    name: 'Fruits',
    children: [{ name: 'Apple' }, { name: 'Banana' }]
  },
  {
    name: 'Vegetables',
    children: [{ name: 'Carrot' }, { name: 'Lettuce' }]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  parent?: FlatNode;
}