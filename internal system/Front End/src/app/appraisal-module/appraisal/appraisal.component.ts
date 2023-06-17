import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormControlDirective, Validators } from '@angular/forms';


@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})
export class AppraisalComponent {
  Appraisel = new FormGroup<any>({
    abilityRemarks: new FormControl(''),
    attendanceRemarks: new FormControl(''),
    leadershipAbilityRemarks: new FormControl(''),
    deadlinesRemarks: new FormControl(''),
    technicalSkillRemarks: new FormControl(''),
    qualityOfWorkRemarks: new FormControl(''),
    teamWorkAbilityRemarks: new FormControl(''),
    employeeComments: new FormControl(''),
    futureGoals: new FormControl(''),
    teamWorkAbilityRating:new FormControl(''),
    qualityOfWorkRating:new FormControl(''),
    technicalSkillRating:new FormControl(''),
    deadlinesRating:new FormControl(''),
    leadershipAbilityRating:new FormControl(''),
    attendanceRating:new FormControl(''),
    abilityRating:new FormControl('')

  })

  appraisel(item: any) {
    console.log(item);

  }
}
