import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-cms-upload-admin',
  templateUrl: './cms-upload-admin.component.html',
  styleUrls: ['./cms-upload-admin.component.css']
})

export class CmsUploadAdminComponent {


  uploadForm: FormGroup;
  Empuser_type: any;
  Empuser_id: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loginservice: LoginServiceService
  ) {
    this.uploadForm = this.formBuilder.group({
      user_id: new FormControl('', Validators.required),
      user_type: new FormControl('', Validators.required),
      docCat: new FormControl('', Validators.required),
      docType: new FormControl(''),
      docCatText: new FormControl(''),
      docTypeText: new FormControl(''),
      uploadDoc: new FormControl(null, Validators.required),
    });

    const user = this.loginservice.getData();
    this.Empuser_id = user[0];
    this.Empuser_type = user[2];
    console.log("emp id ", this.Empuser_id);
    console.log("emp_access", this.Empuser_type);
    
    // // Set the initial values for user_id and user_type in the form
    this.uploadForm.patchValue({
      user_id: this.Empuser_id,
      user_type: this.Empuser_type,
    });
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      console.log('Form values:', this.uploadForm.value);
      // Send the form data to the backend POST API
      const formData = new FormData();

      if (this.Empuser_type === 'L3') {
        formData.append('user_id', this.uploadForm.get('user_id')?.value);
        formData.append('user_type', this.uploadForm.get('user_type')?.value);
      } 

      else  {  
        formData.append('user_id', this.uploadForm.get('user_id')?.value);
        formData.append('user_type', this.uploadForm.get('user_type')?.value);
      }

      formData.append('docCat', this.uploadForm.get('docCat')?.value);
      formData.append('docType', this.uploadForm.get('docType')?.value);
      formData.append('docCatText', this.uploadForm.get('docCatText')?.value);
      formData.append('docTypeText', this.uploadForm.get('docTypeText')?.value);
      formData.append('uploadDoc', this.uploadForm.get('uploadDoc')?.value);

      

      this.http.post<any>('http://localhost:4000/cms/cmsUploadPost', formData).subscribe(
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






















  // uploadForm: FormGroup;
  // Empuser_type: any;
  // Empuser_id: any;
  // data: any;



  // constructor(private http: HttpClient, private formBuilder: FormBuilder, private loginservice: LoginServiceService) {


  //   const user = this.loginservice.getData();
  //   this.Empuser_id = user[0];
  //   this.Empuser_type = user[2];
  //   console.log("emp id ",this.Empuser_id); 
  //   console.log("emp_access",this.Empuser_type);

  //   this.uploadForm = this.formBuilder.group({
  //     user_id: new FormControl('', Validators.required),
  //     user_type: new FormControl('', Validators.required),
  //     docCat: new FormControl('', Validators.required),
  //     docType: new FormControl(''),
  //     docCatText: new FormControl(''),
  //     docTypeText: new FormControl(''),
  //     uploadDoc: new FormControl(null, Validators.required),

  //   });
  // }


  // onSubmit(): void {


  //   if (this.uploadForm.valid) {
  //     console.log('Form values:', this.uploadForm.value);
  //     // Send the form data to the backend POST API
  //     const formData = new FormData();
  //     formData.append('user_id', this.uploadForm.get('user_id')?.value);
  //     // console.log("useriddd", this.uploadForm.get('user_id')?.value ||(this.user_id) );
  //     formData.append('user_type', this.uploadForm.get('user_type')?.value);
  //     formData.append('docCat', this.uploadForm.get('docCat')?.value);
  //     formData.append('docType', this.uploadForm.get('docType')?.value);
  //     formData.append('docCatText', this.uploadForm.get('docCatText')?.value);
  //     formData.append('docTypeText', this.uploadForm.get('docTypeText')?.value);
  //     formData.append('uploadDoc', this.uploadForm.get('uploadDoc')?.value);

  //     console.log('Form 2222:', formData);

  //     this.http.post<any>('http://localhost:4000/cms/cmsUploadPost', formData).subscribe(
  //       (response: any) => {
  //         console.log('Document uploaded successfully:', response);
  //         // Handle the success response here if needed
  //       },
  //       (error: any) => {
  //         console.error('Error uploading document:', error);
  //         // Handle the error response here if needed
  //       }
  //     );
  //   }
   
  // }

  // onFileChange(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files[0]) {
  //     this.uploadForm.patchValue({
  //       uploadDoc: inputElement.files[0]
  //     });
  //     this.uploadForm.get('uploadDoc')?.updateValueAndValidity();
  //   }
  // }























  //   uploadForm: FormGroup;

  //   constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  //     this.uploadForm = this.formBuilder.group({
  //       user_id: new FormControl(''),
  //       user_type: new FormControl(''),
  //       docCat: new FormControl(''),
  //       docType:new FormControl(''),
  //       docCatText:new FormControl(''),
  //       docTypeText: new FormControl(''),
  //       uploadDoc: new FormControl('')
  //     });
  //   }

  //   onSubmit(): void {
  //     if (this.uploadForm.valid) {
  //       const formData = new FormData();
  //       formData.append('user_id', this.uploadForm.get('user_id')?.value);
  //       formData.append('user_type', this.uploadForm.get('user_type')?.value);
  //       formData.append('docCat', this.uploadForm.get('docCat')?.value);
  //       formData.append('docType', this.uploadForm.get('docType')?.value);
  //       formData.append('docCatText', this.uploadForm.get('docCatText')?.value);
  //       formData.append('docTypeText', this.uploadForm.get('docTypeText')?.value);
  //       formData.append('uploadDoc', this.uploadForm.get('uploadDoc')?.value);
  // console.log(formData.append);

  //       // Send the form data to the backend
  //       this.http.post('http://localhost:4000/cms/cmsUploadPostEmployee', formData)
  //         .subscribe(
  //           (response: any) => {
  //             console.log('Document uploaded successfully:', response);
  //             // Handle the success response here if needed
  //           },
  //           (error: any) => {
  //             console.error('Error uploading document:', error);
  //             // Handle the error response here if needed
  //           }
  //         );
  //     }
  //   }

  //   onFileChange(event: Event): void {
  //     const inputElement = event.target as HTMLInputElement;
  //     if (inputElement.files && inputElement.files[0]) {
  //       this.uploadForm.patchValue({
  //         uploadDoc: inputElement.files[0]
  //       });
  //       this.uploadForm.get('uploadDoc')?.updateValueAndValidity();
  //     }
  //   }


