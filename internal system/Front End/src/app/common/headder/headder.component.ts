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
  photoUrl: string | undefined; 

  user_id: any;
  constructor(private service: LoginServiceService, private http: HttpClient, private router: Router) {
    const data = this.service.getData()
    this.username = data[1];
    this.user_id = data[0];

    console.log(this.user_id);

  }

  /////////////////////////////////  To Change the profile Pic////////////////////////////////////////
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const userId = this.user_id; // Assuming this.user_id contains the user_id value
    this.uploadFile(file, userId);
  }

  uploadFile(file: File, userId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId); // Append the user_id to the FormData
    this.profilePhoto(formData);
  }


  profilePhoto(formData: FormData) {
    console.log("Calling API...!!");
    this.http.post<any>('http://localhost:4000/cms/cmsUploadPhotoEmployee', formData)
      .subscribe(
        (response: any) => {
          console.log(response);
          // Update the photoUrl with the newly uploaded photo URL

          // this.photoUrl = response.photoUrl;
          this.getProfilePhoto(this.user_id);
          alert('Profile picture uploaded successfully!');
        },
        error => {
          console.error(error);
          alert('Error uploading profile picture.');
        }
      );
  }


  //////////////////////// Login View Pic /////////////////////////////////////////////
  ngOnInit() {
    const eid = this.user_id; // Replace this with the actual employee ID
    this.getProfilePhoto(eid);
  }
  getProfilePhoto(eid: string) {
    const apiUrl = `http://localhost:4000/cms/profile-photo/${eid}`;
    this.http.get(apiUrl, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageDataUrl = reader.result as string;
            this.photoUrl = imageDataUrl; // Update the photoUrl with the retrieved image data
          };
          reader.readAsDataURL(response);
        },
        error => {
          console.error(error);
          // Handle error, e.g., display a placeholder image
          // this.photoUrl = 'path/to/placeholder-image.png';

          // alert('Error uploading profile picture. Please try again later.');
        }
      );
  }

  //////////////////////////////////////    LOGOUT   /////////////////////////////////
  logout() {
    console.log("user_id", this.user_id);
    const params = new HttpParams()
      .set('user_id', this.user_id.toString());

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