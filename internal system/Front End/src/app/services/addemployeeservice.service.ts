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

 

  insert(data: any): void {
    this.http.post('http://localhost:4000/capture/insert', data).subscribe(
      (response: any) => {
        
          console.log(response.message);
          console.log(response.notification);
          
       

        if(response.message=='redirect to PersonalDetails'){
          this.router.navigate(['/empProfessional'])
          
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
