import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-proj-dealloc',
  templateUrl: './proj-dealloc.component.html',
  styleUrls: ['./proj-dealloc.component.css']
})
export class ProjDeallocComponent {

  searchProjcetId: any;
  user_id: any;
  notification: any;
  constructor(private projectService: ProjectserviceService,
    private loginService: LoginServiceService,
    private http: HttpClient
  ) {
    this.user_id = loginService.getData()[0];
    const data = projectService.getData()[3];
    this.searchProjcetId = data.project;
    console.log(this.searchProjcetId, "cheking3", typeof (this.searchProjcetId));





  }
  ProjectId = new FormGroup<any>({
    projectid: new FormControl('')
  })
  projectId(item: any) {
   
    const confirmation = confirm("Are you sure want to De-Allocate This Project????? " + item);
    if (confirmation) {

      
      const Item = {
        projid: item,
        user_id: this.user_id
      }
      console.log(Item);
      this.projectDeAllocate(Item)
      // Your code to proceed with the execution goes here
    } 
  }

  projectDeAllocate(item: any) {
  
    this.http.post('http://localhost:4000/projectdetails/projDeallocation', item)
      .subscribe(
        (response: any) => {
          console.log(response);
          
          this.notification = response.notification;
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }
}

