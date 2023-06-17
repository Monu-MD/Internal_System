import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-appraisal-data',
  templateUrl: './view-appraisal-data.component.html',
  styleUrls: ['./view-appraisal-data.component.css']
})
export class ViewAppraisalDataComponent {
  View_Appraisal_Data= new FormGroup<any>({
    employeeName: new FormControl(''),
    appraisalMonth: new FormControl(''),
    appraisalYear: new FormControl('')
  })
  viewAppraisalData(item: any) {
    console.log(item);

  }

}
