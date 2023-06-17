import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';


@Component({
  selector: 'app-project-detial',
  templateUrl: './project-detial.component.html',
  styleUrls: ['./project-detial.component.css']
})
export class ProjectDetialComponent {

  project_Detail =new FormGroup<any>({
    Projectid:new FormControl(''),
    customerId:new FormControl(''),
    deliveryManager:new FormControl(''),
    paymentType:new FormControl(''),
    customerClass:new FormControl(''),
    projectTeamSize:new FormControl(''),
    projectManager:new FormControl(''),
    projectType:new FormControl(''),
    projectCurrency:new FormControl(''),
    conversationRate:new FormControl(''),
    poNumber:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),
    remarks:new FormControl(''),
  })

  projectDetail(item:any){
    console.log(item);
    
  }

}
