import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search-employee-details',
  templateUrl: './search-employee-details.component.html',
  styleUrls: ['./search-employee-details.component.css']
})
export class SearchEmployeeDetailsComponent {

  
  employeeId:any;
  searchEmpolyeeDetailsForm=new FormGroup<any>({
    employeeId: new FormControl('', [Validators.required])

  })
  onSubmit(item:any){
    console.log(item);
  
  }

  get(){
    return this.onSubmit
  }
}
