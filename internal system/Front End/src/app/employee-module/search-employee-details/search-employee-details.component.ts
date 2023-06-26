import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { EmpdetaislService } from 'src/app/services/employeeDetails/empdetaisl.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-search-employee-details',
  templateUrl: './search-employee-details.component.html',
  styleUrls: ['./search-employee-details.component.css']
})
export class SearchEmployeeDetailsComponent {
  user_type: any;

  constructor(private service: EmpdetaislService, private loginSerivce: LoginServiceService) {
    const user = this.loginSerivce.getData();
    this.user_type = user[2];


  }

  employeeId: any;
  searchEmpolyeeDetailsForm = new FormGroup<any>({
    employeeId: new FormControl('', [Validators.required])

  })
  onSubmit(item: any) {
    console.log(item.employeeId);
    if (item != null) {
      this.service.searchEmpDetails(item)
    }

  }

  get() {
    return this.onSubmit
  }
}
