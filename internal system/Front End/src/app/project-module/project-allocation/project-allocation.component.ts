import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectserviceService } from 'src/app/services/projectservice.service';


@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css'],
  
})
export class ProjectAllocationComponent {
  empname: any
  home_cur: any;
  manager: any;
  toppingList:any
  constructor(private projectService: ProjectserviceService) {
    const data = this.projectService.getData()[2]
  
    // log
    this.empname=data.empname;
    this.home_cur=data.home_cur;
    this.manager=data.manager;


  }

  Project_Allocation = new FormGroup<any>({
    projectid: new FormControl(''),
    projectReportingManager: new FormControl(''),
    projectAllocation: new FormControl(''),
    allocationStartDate: new FormControl(''),
    allocationEndDate: new FormControl(''),
    employeeLocationType: new FormControl(''),
    employeeBillable: new FormControl(''),
    empname:new FormControl(''),
  })
  projectAllocation(item: any) {
    console.log(item);
  }

 

}
