import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TravelServiceService {
  projectId:any;

  constructor(private http:HttpClient,private rouetr:Router) { }

  fetchProjectId(employeeId:string){
    console.log('service', employeeId);

    // const params = new HttpParams().set('employeeId', JSON.stringify(employeeId, null, "'"));
    const params = new HttpParams().set('employeeId', employeeId.toString());

    this.http.get('http://localhost:4000/travel/travel', { params }).subscribe(
      (response: any) => {
        this.projectId=response.projectId;
        this.rouetr.navigate([response.redirect])
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  getTrvelData(){
    return[this.projectId]
  }
}
