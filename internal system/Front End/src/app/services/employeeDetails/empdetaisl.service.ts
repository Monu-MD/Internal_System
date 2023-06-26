import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpdetaislService {

  constructor(private http:HttpClient,private router:Router) { }
  searchEmpDetails(data: any): void {
    console.log("data",data);
    
    this.http.post('http://localhost:4000/employeeDetails/viewempdet', data).subscribe(
      (response: any) => {
        
          console.log(response.message,"response");
          console.log(response.data);
          
       

        if(response.message=='redirect to employee detail view'){
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
