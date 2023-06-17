import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policy-upload-admin',
  templateUrl: './policy-upload-admin.component.html',
  styleUrls: ['./policy-upload-admin.component.css']
})
export class PolicyUploadAdminComponent {

Policy_Upload_Admin=new FormGroup<any>({
  policyTag:new FormControl(''),
  documentName:new FormControl(' '),
  uploadDocumet:new FormControl(' '),
})

policyUploadAdmin(item:any){
  console.log(item);
  
}
}
