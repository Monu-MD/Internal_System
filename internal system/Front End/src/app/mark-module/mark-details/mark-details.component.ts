import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';


@Component({
  selector: 'app-mark-details',
  templateUrl: './mark-details.component.html',
  styleUrls: ['./mark-details.component.css']
})
export class MarkDetailsComponent {
  itemsPerPageOptions: any;
  onItemsPerPageChange() {
    throw new Error('Method not implemented.');
  }
  user_id: any;
  user_type: any;
  user_name: any;
  projectId: any;

  project_id: any;
  ename: any;
  eid: any;
  emp_access: any;
  projectid_count: any;
  parse_count: any;
  parse: any;
  serial_number: any;
  milestone_name: any;
  capture_per: any;
  direct_amount: any;
  del_flg: any;
  milestone_exp_date: any;
  confirm_flg: any;
  paid_flg: any;
  rcre_user_id: any;
  lchg_user_id: any;
  rcre_time: any;
  lchg_time: any;
  confirmed_date: any;
  paid_date: any;
  project_details: any;


  constructor(private loginservice: LoginServiceService, private projectdet: ProjectserviceService) {
    const project_details = this.loginservice.getData();
    this.user_id = project_details[0];
    this.projectId = project_details[6];
    this.user_type = project_details[2];
    console.log("project...........", project_details[6]);


    if (project_details != null) {
      
      const data = project_details[6];
      console.log(data);
      const parse=data.parse[0]
      console.log(parse);
      


      this.project_id = parse.project_id;
      this.ename = parse.ename;
      this.eid = parse.eid;
      this.emp_access = parse.emp_access;
      this.projectid_count = parse.projectid_count;
      this.parse = parse.parse;
      this.serial_number = parse.serial_number;
      this.milestone_name = parse.milestone_name;
      this.capture_per = parse.capture_per;
      this.direct_amount = parse.direct_amount;
      this.del_flg = parse.del_flg;
      this.milestone_exp_date = parse.milestone_exp_date;
      this.confirm_flg = parse.confirm_flg;
      this.paid_flg = parse.paid_flg;
      this.confirm_flg = parse.confirm_flg;
      this.rcre_user_id = parse.rcre_user_id;
      this.confirmed_date = parse.confirmed_date;
      this.paid_date = parse.paid_date;
      this.lchg_user_id = parse.lchg_user_id;
      this.rcre_time = parse.rcre_time;
      this.lchg_time = parse.lchg_time;
      this.paid_date = parse.paid_date;


    }
  }











}
