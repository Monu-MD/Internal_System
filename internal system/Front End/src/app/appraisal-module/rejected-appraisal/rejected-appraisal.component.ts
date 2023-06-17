import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rejected-appraisal',
  templateUrl: './rejected-appraisal.component.html',
  styleUrls: ['./rejected-appraisal.component.css']
})
export class RejectedAppraisalComponent {
  rejected_Appraisel=new FormGroup<any>({
    
    abilityRemarks1: new FormControl(''),
    abilityRemarks2: new FormControl(''),
    attendence: new FormControl(''),
    attendence1: new FormControl(''),
    ledablty: new FormControl(''),
    ledabltyRmks: new FormControl(''),
    meetdead: new FormControl(''),
    meetdeadRmks: new FormControl(''),
    tecskill: new FormControl(''),
    tecskillRmks: new FormControl(''),
    qltwrk: new FormControl(''),
    qltwrkRmks: new FormControl(''),
    temwrk: new FormControl(''),
    temwrkRmks: new FormControl(''),

    employeeComments: new FormControl(''),
    futureGoals: new FormControl(''),
    futureGoals1: new FormControl(''),
    futureGoals2: new FormControl(''),

    

    
  })

  rejectedAppraisel(item:any){
    
  }

}
