import { Component, OnInit ,ViewChild } from '@angular/core';
import { ClassificationService } from './org-tree.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'orgchartandequipments',
  templateUrl: './orgchartandequipments.component.html',
  styleUrls: ['./orgchartandequipments.component.scss', ],
  standalone:true,
  imports: [
    CommonModule,
  
  ],
})
export class OrgChartAndEquipmentsComponent  implements OnInit{
  ngOnInit(): void {
    
  }
}
export interface ClassificationNode {
  id: number;
  name: string;
  hasChildren: boolean;
  children?: ClassificationNode[];
}
// export interface ClassificationNode {
//   Id: number;
//   Name: string;
//   HasChildren: boolean;
//   Children?: ClassificationNode[];
// }
 