import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassificationNode } from './orgchartandequipments.component';



@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  private apiUrl = 'http://localhost:5140/classification'; // URL برای ارتباط با API

  constructor(private http: HttpClient) {}

  getAllClassifications(): Observable<ClassificationNode[]> {
    return this.http.get<ClassificationNode[]>(this.apiUrl);
  }

  getClassificationsByParentId(parentId: number): Observable<ClassificationNode[]> {
    return this.http.get<ClassificationNode[]>(`${this.apiUrl}/?parentId=${parentId}`);
  }
}
