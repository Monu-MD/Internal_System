import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-do-appraisal',
  templateUrl: './do-appraisal.component.html',
  styleUrls: ['./do-appraisal.component.css']
})
export class DoAppraisalComponent {

  employee_comment = new FormGroup<any>({

    comment: new FormControl(''),
    goals: new FormControl(''),
  });

  comment(item:any){
    console.log(item);
  }
}
