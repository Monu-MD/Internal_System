import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css']
})
export class ProjectAllocationComponent {

  Project_Allocation = new FormGroup<any>({
    projectid: new FormControl(''),
    projectReportingManager: new FormControl(''),
    projectAllocation: new FormControl(''),
    allocationStartDate: new FormControl(''),
    allocationEndDate: new FormControl(''),
    employeeLocationType: new FormControl(''),
    employeeBillable: new FormControl(''),
  })
  projectAllocation(item: any) {
    console.log(item);

  }
}
