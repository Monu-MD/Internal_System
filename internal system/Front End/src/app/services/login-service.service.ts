import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  data: any;
  phtotUrl: any;
  notification: any;
  constructor(private http: HttpClient, private router: Router) {

  }

  login(data: any): void {
    this.http.post('http://localhost:4000/login', data).subscribe(
      (response: any) => {
        alert(response.notification)

        console.log(response.message);
        console.log(response.notification);
        console.log(response.Data.user_name);
        console.log(response.path);
        console.log(response.mimeType);
        


        this.data = response.Data.user_name;
        this.phtotUrl = response.path;
        this.notification = response.notification;
        if (response.message == 'redirect to dashboard') {

          this.router.navigate(['/dashboard'])

        }
        else if (response.message == 'redirect to login') {

          this.router.navigate(['/'])

        }
      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
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

  getData() {
    console.log(this.data);
    return this.data, this.phtotUrl, this.notification;
  }


}
