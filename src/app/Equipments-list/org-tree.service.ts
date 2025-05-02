import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrgNode {
  orgName: string;
  orgDescription: string;
  isActive: boolean;
  plant: string;
  isRoot: boolean;
  isLeaf: boolean;
  childs: OrgNode[];
}

@Injectable({
  providedIn: 'root'
})
export class OrgTreeService {
  private baseUrl = 'http://localhost:5000/api/orgchart'; // آدرس API خودت رو تنظیم کن

  constructor(private http: HttpClient) {
    
  }

  getTree(): Observable<OrgNode[]> {
    return this.http.get<OrgNode[]>(`${this.baseUrl}/tree`);
  }

  addNode(parentId: string, node: OrgNode): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { parentId, node });
  }

  deleteNode(nodeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${nodeId}`);
  }

  updateNode(nodeId: string, updated: Partial<OrgNode>): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${nodeId}`, updated);
  }
}
