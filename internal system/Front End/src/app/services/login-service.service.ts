import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  user_name: any;
  user_id: any;
  user_type: any;
  data: any;
  phtotUrl: any;
  notification: any;

  
  constructor(private http: HttpClient, private router: Router) {  }



  setData(value: any): void {
    console.log(value);
    
    this.user_name = value.user_name    ;
    this.user_id=value.user_id;
    this.user_type=value.user_type;
    
  }

  getData(): any {
    return [this.user_id,this.user_name,this.user_type]
  }
  





  profilePhoto(formData: any) {
    this.http.post('http://localhost:4000/upload-profile', formData)
      .subscribe(
        response => {
          console.log(response);
          alert('Profile picture uploaded successfully!');
        },
        error => {
          console.error(error);
          alert('Error uploading profile picture.');
        }
      );
  }
  forget(data: any): void {
    this.http.post('http://localhost:4000/forgotpwd', data).subscribe(
      (response: any) => {
        alert(response.notification)

        console.log(response.message);
        console.log(response.notification);
        alert(response.notification)
        this.data = response.Data.user_name;

        if (response.message == 'redirect to login') {

          this.router.navigate(['/'])

        }
      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
  }

  


}
