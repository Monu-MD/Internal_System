import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent {
  pidRptName: any;
  user_name: any;
  user_type: any;
  user_id: any;
  notification: any;
  disable: any;
  selectedProject: any;
  reportingManager: any;
  rptMgrId: any;
  selectedReportingManagerName: any;
  selectedEmployee: any;

  constructor(private travelservice: TravelServiceService, private loginservice: LoginServiceService,
    private http: HttpClient) {
    // this.pidRptName = this.travelservice.getTrvelData()[0];
    this.user_id = this.loginservice.getData()[0];
    this.user_name = this.loginservice.getData()[1];
    this.user_type = this.loginservice.getData()[2];
    this.notification = this.travelservice.getTrvelData()[1];
    if (this.user_type == 'A1') {
      const data = this.travelservice.getTrvelData();
      this.pidRptName = data[0]
      console.log(data);

    } else {
      this.pidRptName = [this.travelservice.getTrvelData()[0]];

    }

  }

  travelid = new FormGroup<any>({

    projectId: new FormControl(''),
    journeyType: new FormControl(''),
    travelDate: new FormControl(''),
    tentativeReturnDate: new FormControl(''),
    fromLocation: new FormControl(''),
    toLocation: new FormControl(''),
    remarks: new FormControl(''),
    toBeApprovedby: new FormControl(''),
    employeeId: new FormControl(''),


  })
  filterEmployeeNames: any[] = [];

  onProjectSelection() {
    const selectedProjectId = this.travelid.get('projectId')?.value;

    if (this.user_type == 'A1') {
      console.log("in A1", selectedProjectId);
      this.filterEmployeeNames = this.getFilteredEmployees(selectedProjectId);
      console.log(this.filterEmployeeNames);

    } else {
      this.selectedProject = this.pidRptName.find((project: { project_id: any; }) => project.project_id === selectedProjectId);      
      this.selectedReportingManagerName = this.selectedProject.reporting_manager_name ||this.selectedProject.emp_reporting_mgr_name;
      this.rptMgrId = this.selectedProject.reporting_manager || this.selectedProject.emp_reporting_mgr
      

    }
  }
  getFilteredEmployees(projectId: string): string[] {
    // Filter the employee names based on the selected project ID
    const employees = this.pidRptName.filter((data: { project_id: string; }) => data.project_id === projectId);
    return employees.map((data: { emp_name: any; }) => data.emp_name);
  }


  onEmployeeSelection() {
    const selectedEmployee = this.travelid.get('employeeId')?.value;
    // When the employee selection changes, get the reporting manager details
    const selectedEmployeeData = this.pidRptName.find((data: { emp_name: any; }) => data.emp_name === selectedEmployee);
    console.log(selectedEmployeeData);
    this.rptMgrId = selectedEmployeeData.reporting_manager;
    this.selectedReportingManagerName = selectedEmployeeData.reporting_manager_name;
    console.log(this.rptMgrId);

  }


  travel(item: any) {
    console.log(item);
    if (this.user_type === 'A1') {
      const user_id = this.pidRptName.find((data: { emp_name: string; }) => data.emp_name === item.employeeId);
      console.log(user_id);
      item.employeeId=user_id.emp_id;
      const payload = {
        item: item,
        user_name: this.user_name,
        user_type: this.user_type,
        user_id: this.user_id,
        test: 'Submit'
      };
      this.travelservice.travelReq(payload)
      

    } else {

      const payload = {
        item: item,
        user_name: this.user_name,
        user_type: this.user_type,
        user_id: this.user_id,
        test: 'Submit'
      };
      this.travelservice.travelReq(payload)
    }
  }
}







