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

 

  // onFileSelected(event: any) {
  //   // Get the selected file name
  //   const file = event.target.files[0];
  //   this.fileName = file ? file.name : 'No file chosen';
  //     console.log("onfile");
  //   this.uploadFile(file)
  // }

  // project_Doc=new FormGroup<any>({
  //   projectid:new FormControl(''),
  //   uploadDoc:new FormControl(''),
  //   Tag:new FormControl(''),
  //   DocType:new FormControl(''),
 
  // })


  // uploadFile(file: any) {
  //   const formData = new FormData();
  //   formData.append('profile', file);
  //   formData.append('username', this.service.data);
  //   // formData.append('object2', JSON.stringify({ key: 'value' }));
  //   this.profilePhoto(formData)
  //   throw new Error('Method not implemented.');
  // }
  // projectDoc(value:any){
  //   console.log(value);
    
  // }
  project_Doc: FormGroup;

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
      formData.append('CompanyName', this.project_Doc.get('CompanyName')?.value);
      formData.append('Tag', this.project_Doc.get('Tag')?.value);
      formData.append('uploadDoc', this.project_Doc.get('uploadDoc')?.value);

      // Send the form data to the backend
      this.http.post('http://localhost:4000/projectdetails/projectDoc', formData)
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
      this.project_Doc.patchValue({
        uploadDoc: inputElement.files[0]
      });
      this.project_Doc.get('uploadDoc')?.updateValueAndValidity();
    }
  }
}
