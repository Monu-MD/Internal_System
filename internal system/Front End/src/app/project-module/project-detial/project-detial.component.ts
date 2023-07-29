import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';


@Component({
  selector: 'app-project-detial',
  templateUrl: './project-detial.component.html',
  styleUrls: ['./project-detial.component.css']
})
export class ProjectDetialComponent {
  user_id:any;
  cocodcustclass: any;
  cocodpcr: any;
  cocdpty: any;
  cocdpmty: any;
  cocdcust: any;
  cocddelname: any;
  cocdemp: any;
  cocdProjMgr:any;
  notification: any;

  constructor(private projectservice:ProjectserviceService,
    private http:HttpClient,
    private loginservice:LoginServiceService){
      this.user_id=this.loginservice.getData()[0];

    const Data=this.projectservice.getData();
    var data=Data[1];
    this.cocodcustclass=data.comm_code_id_cus,
    this.cocodpcr=data.comm_code_pcr;
    this.cocdpty=data.comm_code_pty;
    this.cocdpmty=data.comm_paymentype;
    this.cocdcust=data.customer
    this.cocddelname=data.delname
    this.cocdemp=data.employee;
    this.cocdProjMgr=data.projMgr;
    console.log(this.cocddelname);


  }

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
   const Item={
      user_id:this.user_id,
      Item:item
    }
    this.addProjectDetails(Item)
  }
  addProjectDetails(data: any): void {
    this.http.post('http://localhost:4000/projectdetails/addproductdetails', data).subscribe(
      (response: any) => {
        console.log(response);

        this.notification = response.notification;
        
        
      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
  }
}
