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
  reportingManager:any;
  rptMgrId:any;
  constructor(private travelservice: TravelServiceService, private loginservice: LoginServiceService,
    private http: HttpClient) {
    // this.pidRptName = this.travelservice.getTrvelData()[0];

    this.pidRptName = [this.travelservice.getTrvelData()[0]];
    this.user_id = this.loginservice.getData()[0];
    this.user_name = this.loginservice.getData()[1];
    this.user_type = this.loginservice.getData()[2];
    this.notification=this.travelservice.getTrvelData()[1];
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
    rptMgrId: new FormControl(''),


  })
  onProjectSelection() {
    const selectedProjectId = this.travelid.get('projectId')?.value;
    this.selectedProject = this.pidRptName.find((project: { project_id: any; }) => project.project_id === selectedProjectId);
    this.reportingManager=this.selectedProject.emp_reporting_mgr_name;
    this.rptMgrId=this.selectedProject.emp_reporting_mgr
    
  }

  travel(item: any) {
    console.log(item);
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
