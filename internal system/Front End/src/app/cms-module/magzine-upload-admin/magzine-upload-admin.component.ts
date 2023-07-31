import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-magzine-upload-admin',
  templateUrl: './magzine-upload-admin.component.html',
  styleUrls: ['./magzine-upload-admin.component.css']
})
export class MagzineUploadAdminComponent {

  uploadForm: FormGroup;


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
   
  ) {
    this.uploadForm = this.formBuilder.group({
      magYear: new FormControl('', Validators.required),
      magQuarter: new FormControl('', Validators.required),
      uploadDoc: new FormControl(null, Validators.required)
    });

  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      console.log('Form values:', this.uploadForm.value);
      // Send the form data to the backend POST API
      const formData = new FormData();
      formData.append('magYear', this.uploadForm.get('magYear')?.value);
      formData.append('magQuarter', this.uploadForm.get('magQuarter')?.value);
      formData.append('uploadDoc', this.uploadForm.get('uploadDoc')?.value);
      
      this.http.post<any>('http://localhost:4000/cms/magazineUploadPostAdmin', formData).subscribe(
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
