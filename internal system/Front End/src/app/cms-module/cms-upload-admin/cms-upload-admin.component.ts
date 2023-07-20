import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cms-upload-admin',
  templateUrl: './cms-upload-admin.component.html',
  styleUrls: ['./cms-upload-admin.component.css']
})
export class CmsUploadAdminComponent {

uploadForm: FormGroup;

constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  this.uploadForm = this.formBuilder.group({
    user_id: ['', Validators.required],
    user_type: ['', Validators.required],
    docCat: ['', Validators.required],
    docType: [''],
    CompanyName: [''],
    documentDescription: [''],
    uploadDoc: [null, Validators.required]
  });
}

onSubmit(): void {
  if (this.uploadForm.valid) {
    const formData = new FormData();
    formData.append('user_id', this.uploadForm.get('user_id')?.value);
    formData.append('user_type', this.uploadForm.get('user_type')?.value);
    formData.append('docCat', this.uploadForm.get('docCat')?.value);
    formData.append('docType', this.uploadForm.get('docType')?.value);
    formData.append('CompanyName', this.uploadForm.get('CompanyName')?.value);
    formData.append('documentDescription', this.uploadForm.get('documentDescription')?.value);
    formData.append('uploadDoc', this.uploadForm.get('uploadDoc')?.value);

    // Send the form data to the backend
    this.http.post('http://localhost:4000/cms/cmsUploadPostEmployee', formData)
      .subscribe(
        (response: any) => {
          console.log('Document uploaded successfully:', response);
          // Handle the success response here if needed
        },
        (error: any) => {
          console.error('Error uploading document:', error);
          // Handle the error response here if needed
        }
      );
  }
}

onFileChange(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files[0]) {
    this.uploadForm.patchValue({
      uploadDoc: inputElement.files[0]
    });
    this.uploadForm.get('uploadDoc')?.updateValueAndValidity();
  }
}

}
