import { LocationChangeListener } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';
@Component({
  selector: 'app-search-project-details',
  templateUrl: './search-project-details.component.html',
  styleUrls: ['./search-project-details.component.css']
})
export class SearchProjectDetailsComponent {
  user_type: any;
  user_id: any;


  constructor(private router: Router,private http:HttpClient, private projectservice: ProjectserviceService, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_type = user[2];
    this.user_id = user[0];
  };
  projectId: any;
  searchForm = new FormGroup<any>({
    projectId: new FormControl('', [Validators.required])

  })

  onSubmit(item: any) {
    const Item = {
      Item: item,
      userid: this.user_id,
      projectId: this.projectId
    }
    console.log(item);
    
    console.log(item.projectId,"-------------------------");
    if (item != null) {
      this.SearchProjectDetails(Item)

    }
  }
  SearchProjectDetails(projectId: any): void {
    console.log("enterrrr");
    console.log(this.SearchProjectDetails);
    
    


    this.http.post('http://localhost:4000/markDetails/fetchMark', projectId).subscribe(
      (response: any) => {

        console.log(response.message, "response");
        console.log(response.data,"===========================");
        if (response.message == 'redirect to recall mile stone') {
          this.loginservice.set_project_tbl(response.data)
          this.router.navigate(['/mrk'])

        }
      },
      (error: any) => {
        console.error('API Error:', error);

      }
    )

    // get(){
    //   return this.onSubmit
    // }

  }
}




