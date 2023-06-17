import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viewappraisal',
  templateUrl: './viewappraisal.component.html',
  styleUrls: ['./viewappraisal.component.css']
})
export class ViewappraisalComponent {
  view_Appraisel=new FormGroup<any>({
    abilityRemarks:new FormControl(''),
    attendanceRemarks:new FormControl(''),
    leadershipAbilityRemarks:new FormControl(''),
    deadlinesRemarks:new FormControl(''),
    technicalSkillRemarks:new FormControl(''),
    qualityOfWorkRemarks:new FormControl(''),
    teamWorkAbilityRemarks:new FormControl(''),
    employeeComments:new FormControl(''),
    futureGoals:new FormControl(''),
    abilityRating:new FormControl(''),
    attendanceRating:new FormControl(' '),
    leadershipAbilityRating:new FormControl(' '),
    deadlinesRating:new FormControl(' '),
    technicalSkillRating:new FormControl(''),
    qualityOfWorkRating:new FormControl(''),
    teamWorkAbilityRating:new FormControl(''),

  })

  viewAppraisel(item:any){
    console.log(item);
    
  }

}
