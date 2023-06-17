import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';
import{AddemployeeserviceService} from '../../services/addemployeeservice.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.css']
})
export class ProfessionalDetailsComponent {
  

  constructor(private empdet:AddemployeeserviceService,private router:Router){}
  probation_Period = '';
  previous_Experience = '';
  professional_Details = new FormGroup<any>({

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
    this.empdet.insert(item);
    if(item!=null){
      this.router.navigate(['dashboard'])
    }
    
  }

  get employeeId() {
    return this.professional_Details.get('employeeId')
  }
  
}
