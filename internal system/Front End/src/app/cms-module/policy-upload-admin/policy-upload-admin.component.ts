import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-policy-upload-admin',
  templateUrl: './policy-upload-admin.component.html',
  styleUrls: ['./policy-upload-admin.component.css']
})
export class PolicyUploadAdminComponent {





uploadForm: FormGroup;


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
   
  ) {
    this.uploadForm = this.formBuilder.group({
      policyTag:new FormControl(''),
      docName:new FormControl(' '),
      uploadDoc:new FormControl(' '),
    });

  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      console.log('Form values:', this.uploadForm.value);
      // Send the form data to the backend POST API
      const formData = new FormData();
      formData.append('policyTag', this.uploadForm.get('policyTag')?.value);
      formData.append('docName', this.uploadForm.get('docName')?.value);
      formData.append('uploadDoc', this.uploadForm.get('uploadDoc')?.value);
      
      this.http.post<any>('http://localhost:4000/cms/policyUploadPostAdmin', formData).subscribe(
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
        uploadDoc: inputElement.files[0],
      });
      this.uploadForm.get('uploadDoc')?.updateValueAndValidity();
    }
  }
}

