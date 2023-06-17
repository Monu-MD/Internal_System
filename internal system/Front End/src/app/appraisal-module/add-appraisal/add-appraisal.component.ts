import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';


@Component({
  selector: 'app-add-appraisal',
  templateUrl: './add-appraisal.component.html',
  styleUrls: ['./add-appraisal.component.css']
})
export class AddAppraisalComponent {

  add_Appraisel=new FormGroup<any>({
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

  addAppraisel(item:any){
    console.log(item);
    
  }
}
