import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpdetaislService } from 'src/app/services/employeeDetails/empdetaisl.service';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-modify-professional-details',
  templateUrl: './modify-professional-details.component.html',
  styleUrls: ['./modify-professional-details.component.css']
})
export class ModifyProfessionalDetailsComponent {
  user_id: any;
  user_type: any;
  
  constructor(private empDetservice: EmpdetaislService, private loginSerivce: LoginServiceService, private http: HttpClient,
    private router: Router) {
    const user = this.loginSerivce.getData();
    this.user_type = user[2];
    this.user_id = user[0];
  }
  employeeName:any;
  modifyProfessionalDetailsForm=new FormGroup<any>({
    employeeName: new FormControl('', [Validators.required])

  })

  
  onSubmit(item:any){
    console.log(item);
  
  }

  get(){
    return this.onSubmit
  }
}
