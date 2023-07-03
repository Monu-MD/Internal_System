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
    employeeId: new FormControl('', [Validators.required])

  })

  
  onSubmit(item: any) {
    const Item = {
      Item: item,
      userid: this.user_id
    }
    console.log(item.employeeId);
    if (item != null) {
      this.searchEmpDetails(Item)
    }

  }
  searchEmpDetails(employeeId: any): void {
    // console.log("data",data);
    // const params =new HttpParams().set('employeeId',data.toString());


    this.http.post('http://localhost:4000/employeeDetails/viewempdet', employeeId).subscribe(
      (response: any) => {

        console.log(response.message, "response");
        console.log(response.data);
        if (response.message == 'redirect to employee detail view') {
          // this.empDetservice.setData(response.data)
          this.loginSerivce.setEmp_master_Tbl(response.data)
          this.router.navigate(['/empProfessional'])

        }
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  get(){
    return this.onSubmit
  }
}
