import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddemployeeserviceService } from 'src/app/services/addemployeeservice.service';

@Component({
  selector: 'app-emp-professional-details',
  templateUrl: './emp-professional-details.component.html',
  styleUrls: ['./emp-professional-details.component.css']
})
export class EmpProfessionalDetailsComponent {
  readable=true;
  constructor(private empdet:AddemployeeserviceService,private router:Router){}
  probation_Period = '';
  previous_Experience = '';
  emp_professional_Details = new FormGroup<any>({

    employeeId: new FormControl('', [Validators.required]),
    employeeName: new FormControl(''),
    joiningDate: new FormControl(''),
    email_ID: new FormControl(''),
    probation_Period: new FormControl(''),
    previous_Experience: new FormControl(''),

    years: new FormControl(''),
    month: new FormControl(''),
    previous_Employer_One: new FormControl(''),
    previous_Employer_Two: new FormControl(''),
    previous_Employer_Three: new FormControl(''),
    previous_Employer_Four: new FormControl(''),
    previous_Employer_Five: new FormControl('')

  })

  ProfessionalDeatils(item: any) {
    console.log(item);
    // this.empdet.insert(item);
    // if(item!=null){
    //   this.router.navigate(['dashboard'])
    // }
    
  }
  ngmodel(){

  }

  get employeeId() {
    return this.emp_professional_Details.get('employeeId')
  }
  
}

