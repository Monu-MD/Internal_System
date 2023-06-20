import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarkMOdulesService {

  constructor(private http:HttpClient,private router:Router) { }

  markProjectID(projectId:any): void {
    console.log('service', projectId);

    const params = new HttpParams()
      .set('projectId', projectId.toString());

    this.http.get('http://localhost:4000/validateOtp', { params }).subscribe(
      (response: any) => {
        console.log(response.message);
        console.log(response.notification);
        // this.employeeid=response.id;
        
        // Handle the response accordingly
        if(response.message=='redirect to reset page'){
          this.router.navigate(['/changePassword'])
        }
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

}
