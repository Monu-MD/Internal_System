import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css']
})
export class ViewPolicyComponent {

  polDocs: any[] | undefined;
  polLen: number | undefined;

  uploadForm: FormGroup;

  user_access: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private loginservice: LoginServiceService) {
    this.uploadForm = this.formBuilder.group({
      policyTag: new FormControl(''),
    });

    const user = this.loginservice.getData();
    this.user_access = user[2];
  }
  

  onPolicyTagChange() {
    const policyTagValue = this.uploadForm.get('policyTag')?.value;
    if (policyTagValue) {
      const params = new HttpParams().set('policyTag', policyTagValue || '');
      this.http.get('http://localhost:4000/cms/policyDocsView', { params }).subscribe(
        (response: any) => {
          console.log(response);
          this.polDocs = response.polDocs;
          this.polLen = response.polLen;
        },
        (error) => {
          console.error('Error fetching policy data:', error);
        }
      );
    }
  }
  


canDeleteDocuments(): boolean {
  return this.user_access === 'A1';
}


  private readonly apiUrl = 'http://localhost:4000/cms/policyDeleteDocs';
  onDeleteDocument(doc: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.http.delete(`${this.apiUrl}?doc=${doc}`, options).subscribe(
      (response: any) => {
        console.log('Document deleted successfully:', response);
        this.onPolicyTagChange();
      },
      (error) => {
        console.error('Error deleting document:', error);
      }
    );
  }



}
