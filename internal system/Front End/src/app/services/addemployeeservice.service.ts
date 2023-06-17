import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddemployeeserviceService {

  constructor(private http: HttpClient,
    private router:Router
    ) { }

  // apiUrl = 'localhost:4000/insert'

 
  postData(data: any): void {
    this.http.post('http://localhost:4000/capture/registerEmpId', data).subscribe(
      (response: any) => {
        
          console.log(response.message);
       

        if(response.message=='redirect to personal Details '){
          this.router.navigate(['/personalDetails'])
          
        }
        else if(response.message=='redirect to professional Details '){
          console.log("professional entry");
          this.router.navigate(['/professionalDetails'])
          
        }
        else if(response.message=='redirect to register '){
          console.log("professional entry");
          this.router.navigate(['/register'])
          
        }

        
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  insert(data: any): void {
    this.http.post('http://localhost:4000/capture/insert', data).subscribe(
      (response: any) => {
        
          console.log(response.message);
          console.log(response.notification);
          
       

        if(response.message=='redirect to PersonalDetails'){
          this.router.navigate(['/personalDetails'])
          
        }
        else if(response.message=='redirect to professional Details '){
          console.log("professional entry");
          this.router.navigate(['/professionalDetails'])
          
        }
        else if(response.message=='redirect to register'){
          console.log("professional entry");
          this.router.navigate(['/register'])
          
        }

        
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  addEmpPer(data: any): void {
    this.http.post('http://localhost:4000/capture/addempper', data).subscribe(
      (response: any) => {
        
          console.log(response.message);
          console.log(response.notification);
          
       

        if(response.message=='redirect to login page'){
          // console.log("professional entry");
          
          this.router.navigate(['/'])
          
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
