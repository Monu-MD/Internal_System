import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appraisal-data-not-approved',
  templateUrl: './appraisal-data-not-approved.component.html',
  styleUrls: ['./appraisal-data-not-approved.component.css']
})
export class AppraisalDataNotApprovedComponent {

  pkpi = [
    {  ProfessionalKPI: 'No Record Found', Weightage: 'No Record Found', Rating: 'No Record Found', Remarks: 'No Record Found'  },
  ];

  bkpi = [
    {   BehaviouralKPI: 'No Record Found', Weightage: 'No Record Found', Rating: 'No Record Found', Remarks: 'No Record Found'  },
  ];
  
  itemsPerPage = 10;
  currentPage = 1;
  totalItems = this.pkpi.length;
  totalItems2 = this.bkpi.length;
  PerPage: number = 100;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];
  onItemsPerPageChange(): void {
    this.currentPage = 1;
  }

  employee_comment = new FormGroup<any>({

    comment: new FormControl(''),
    goals: new FormControl(''),
  });

  comment(item:any){
    console.log(item);
  }
}
