import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpdetaislService } from 'src/app/services/employeeDetails/empdetaisl.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-search-employee-details',
  templateUrl: './search-employee-details.component.html',
  styleUrls: ['./search-employee-details.component.css']
})
export class SearchEmployeeDetailsComponent {
  user_type: any;
  user_id: any;

  constructor(private empDetservice: EmpdetaislService, private loginSerivce: LoginServiceService, private http: HttpClient,
    private router: Router) {
    const user = this.loginSerivce.getData();
    this.user_type = user[2];
    this.user_id = user[0];
  }

  employeeId: any;
  searchEmpolyeeDetailsForm = new FormGroup<any>({
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
        if (response.message == 'redirect to employee details view') {
          // this.empDetservice.setData(response.data)
          console.log("check1");
          this.loginSerivce.setViewAproval('viewData')
          console.log("check2");
          this.loginSerivce.setEmp_master_Tbl(response.data)
          console.log("check3");
          this.router.navigate(['/empDetailview'])
        }
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  get() {
    return this.onSubmit
  }
}
