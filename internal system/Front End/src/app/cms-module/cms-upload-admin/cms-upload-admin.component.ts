import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cms-upload-admin',
  templateUrl: './cms-upload-admin.component.html',
  styleUrls: ['./cms-upload-admin.component.css']
})
export class CmsUploadAdminComponent {

  constructor(private http: HttpClient,
    ) { }

  cms_Admin_Upload_Documents =new FormGroup<any>({
    user_id:new FormControl(''),
    documentCategeory:new FormControl(''),
    documentDescriptionCompanyName:new FormControl(''),
    documenType:new FormControl(''),
    documentDescription:new FormControl(''),
    UploadDocuments:new FormControl('')
 
  })

  postData(item: any) {
    const postData = {
      user_id:item.user_id,
      documentCategeory: item.documentCategeory,
      documentDescriptionCompanyName: item.documentDescriptionCompanyName,
      documenType: item.documenType,
      documentDescription:item.documentDescription,
      UploadDocuments: item.UploadDocuments
    };

  this.http.post('http://localhost:4000/cms/cmsUploadPostEmployee', postData)
  .subscribe(
    (response: any) => {


      console.log('Data posted successfully:', response);
      // location.reload();

    },
    (error: any) => {
      console.error('Error:', error);
    }
  );
}

onSubmit(item:any){
  console.log(item);
  this.postData(item);
}

 get() {
   return this.onSubmit;
 }
}
