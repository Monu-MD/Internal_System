import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  constructor(private service: LoginServiceService, private http: HttpClient) {
    const data = this.service.getData()
    this.username=data[1]
    
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


    this.service.profilePhoto(formData)

    throw new Error('Method not implemented.');
  }

}









