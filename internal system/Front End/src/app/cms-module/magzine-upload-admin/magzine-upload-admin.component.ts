import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-magzine-upload-admin',
  templateUrl: './magzine-upload-admin.component.html',
  styleUrls: ['./magzine-upload-admin.component.css']
})
export class MagzineUploadAdminComponent {

  magzine_Upload_Admin=new FormGroup<any>({
    year:new FormControl(' '),
    quarter:new FormControl(' '),
    uploadDoucumet: new FormControl(' ')

  })
  magzineUploadAdmin(item:any){
    console.log(item);
    
  }
}
