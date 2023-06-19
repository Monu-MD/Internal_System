import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private router: Router, private http: HttpClient) { }


  getOTP(employeeId: any): void {
    console.log('service', employeeId);

    // const params = new HttpParams().set('employeeId', JSON.stringify(employeeId, null, "'"));
    const params = new HttpParams().set('employeeId', employeeId.toString());

    this.http.get('http://localhost:4000/generateOtp', { params }).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  employeeid:any;
  verifyOtp(otp: number, employeeId: number): void {
    console.log('service', otp);

    const params = new HttpParams()
      .set('otp', otp.toString())
      .set('employeeId', employeeId.toString());

    this.http.get('http://localhost:4000/validateOtp', { params }).subscribe(
      (response: any) => {
        console.log(response.message);
        console.log(response.notification);
        this.employeeid=response.id;
        
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
  updatePwd(data: any): void {
    console.log(data);
    
    this.http.post('http://localhost:4000/updatepwd', data).subscribe(
      
      (response: any) => {
        
          console.log(response.message);
        console.log(response.notification);

       

        if(response.message=='redirect to reset page'){
          this.router.navigate(['/changePassword'])
          
        }
        else if(response.message=='redierct to login'){
        
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
