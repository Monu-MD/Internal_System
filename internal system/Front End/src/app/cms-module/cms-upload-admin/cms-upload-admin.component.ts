import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';

@Component({
  selector: 'app-cms-upload-admin',
  templateUrl: './cms-upload-admin.component.html',
  styleUrls: ['./cms-upload-admin.component.css']
})
export class CmsUploadAdminComponent {

  cms_Admin_Upload_Documents =new FormGroup<any>({
    documentCategeory:new FormControl(''),
    documentDescriptionCompanyName:new FormControl(''),
    documenType:new FormControl(''),
    documentDescription:new FormControl(''),
    UploadDocuments:new FormControl('')
 
  })

  cmsAdminUploadDocuments(items:any){
    console.log(items);
    
  }
}
