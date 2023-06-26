import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.css']
})
export class HeadderComponent {
  selectedFileName: string | undefined;
  username: any;
  photoUrl: any;

  user_id: any;
  constructor(private service: LoginServiceService, private http: HttpClient, private router: Router) {
    const data = this.service.getData()
    this.username = data[1];
    this.user_id = data[0];

    console.log(this.user_id);
    

    // this.photoUrl = this.service.phtotUrl;

  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0]
    console.log("onfile");
    this.uploadFile(file)
  }
  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('profile', file);
    formData.append('username', this.service.data);
    // formData.append('object2', JSON.stringify({ key: 'value' }));
    this.profilePhoto(formData)
    throw new Error('Method not implemented.');
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
  logout() {
    console.log("user_id",this.user_id);
    
    const params = new HttpParams()
      .set('user_id',   this.user_id.toString());

    this.http.get('http://localhost:4000/logout', { params }).subscribe(
      (response: any) => {
        this.service.setData(response)

        if (response.message == 'redirect to login') {
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









