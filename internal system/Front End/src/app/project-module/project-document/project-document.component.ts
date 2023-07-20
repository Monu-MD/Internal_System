import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-document',
  templateUrl: './project-document.component.html',
  styleUrls: ['./project-document.component.css']
})
export class ProjectDocumentComponent {

  selectedProjectId: any;
  selectedDocumentType: any;
  projectTag: any;
  fileName: any;

  // }
  project_Doc: FormGroup;
  notification: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.project_Doc = this.formBuilder.group({
      projectid:new FormControl(''),
        uploadDoc:new FormControl(''),
        Tag:new FormControl(''),
        DocType:new FormControl(''),
    });
  }

  onSubmit(): void {
    if (this.project_Doc.valid) {   
      const formData = new FormData();
      formData.append('projectid', this.project_Doc.get('projectid')?.value);
      formData.append('DocType', this.project_Doc.get('DocType')?.value);
      formData.append('Tag', this.project_Doc.get('Tag')?.value);
      formData.append('uploadDoc', this.project_Doc.get('uploadDoc')?.value);

      // Send the form data to the backend
      this.http.post('http://localhost:4000/projectdetails/projectDoc', formData)
        .subscribe(
          (response: any) => {
            if (response.message== 'redirect to refer') {
              this.notification=response.notification
            }
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
      this.project_Doc.patchValue({
        uploadDoc: inputElement.files[0]
      });
      this.project_Doc.get('uploadDoc')?.updateValueAndValidity();
    }
  }
}
