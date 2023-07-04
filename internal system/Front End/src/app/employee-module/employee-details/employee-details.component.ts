import { Component } from '@angular/core';
import { EmpdetaislService } from 'src/app/services/employeeDetails/empdetaisl.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  user_id:any;
  user_type:any;
  user_name:any;



  // cflag: any;
  EMPID: any;
  EMPNAME: any;
  email: any;
  EMPACCESS: any;
  JDATE: any;
  DESIG: any;
  EMPCLASS: any;
  SALARY: any;
  SALARY_CURR: any;
  SALARY_CURR_DESC: any;
  PID: any;
  rptMan: any;
  RPTMAN: any;
  RPTMAN_DESC: any;
  PROBPERIOD: any;
  PREEM: any;
  PREEXPYEAR: any;
  PREEXPMONTH: any;
  PREEMP: any;
  PREEMP2: any;
  PREEMP3: any;
  PREEMP4: any;
  PREEMP5: any;
  enFlg: any = "Y";
  GENDER: any;
  DOB: any;
  BGROUP: any;
  SHIRT: any;
  COMMADD: any;
  STATE: any;
  CITY: any;
  PINCODE: any;
  RESADD: any;
  STATE1: any;
  CITY1: any;
  PINCODE1: any;
  MOBNUM: any;
  TELNUM: any;
  ECONNUM: any;
  EMERPER: any;
  FATHERSNAME: any;
  MOTHERSNAME: any;
  MARITALSTATUS: any;
  SPOUSENAME: any;
  PANNUM: any;
  PASSNUM: any;
  AADHAARNUM: any;
  DLNUM: any;
  UAN: any;
  NAMEINBANK: any;
  BANKNAME: any;
  BRANCHNAME: any;
  ACCTNUM: any;
  IFSCCODE: any;
  constructor(private loginservice: LoginServiceService, private empDet: EmpdetaislService) {
    const emp_details = this.loginservice.getData();
    this.user_id=emp_details[0];
    this.user_type=emp_details[2]
    
    console.log("emp", emp_details[4]);
    if (emp_details != null ) {

      
      const data = emp_details[4]; 
      
      this.EMPID = data.emp_id;
      this.EMPNAME = data.emp_name;
      this.email = data.emp_email;
      this.EMPACCESS = data.emp_access;
      this.JDATE = data.joining_date;
      this.DESIG = data.designation;
      this.EMPCLASS = data.emp_classification;
      this.SALARY = data.salary;
      this.SALARY_CURR = data.salary_curr;
      this.SALARY_CURR_DESC = data.salary_curr_desc;
      this.PID = data.project_id;
      this.rptMan = data.reporting_mgr;
      this.RPTMAN = data.rptman;
      this.RPTMAN_DESC = data.rptman_desc;
      this.PROBPERIOD = data.emp_prob;
      this.PREEM = data.pre_emp_flg;
      this.PREEXPYEAR = data.prev_expr_year;
      this.PREEXPMONTH = data.prev_expr_month;
      this.PREEMP = data.prev_empr;
      this.PREEMP2 = data.prev_empr2;
      this.PREEMP3 = data.prev_empr3;
      this.PREEMP4 = data.prev_empr4;
      this.PREEMP5 = data.prev_empr5;
      this.enFlg = data.entity_cre_flg;
      this.GENDER = data.gender;
      this.DOB = data.dob;
      this.BGROUP = data.blood_group;
      this.SHIRT = data.shirt_size;
      this.COMMADD = data.com_addr1;
      this.STATE = data.state;
      this.CITY = data.city;
      this.PINCODE = data.pincode;
      this.RESADD = data.comm_addr2;
      this.STATE1 = data.state1;
      this.CITY1 = data.city1;
      this.PINCODE1 = data.pincode1;
      this.MOBNUM = data.phone1;
      this.TELNUM = data.phone2;
      this.ECONNUM = data.emergency_num;
      this.EMERPER = data.emergency_con_person;
      this.FATHERSNAME = data.father_name;
      this.MOTHERSNAME = data.mother_name;
      this.MARITALSTATUS = data.martial_status;
      this.SPOUSENAME = data.spouse_name;
      this.PANNUM = data.pan_number;
      this.PASSNUM = data.passport_num;
      this.AADHAARNUM = data.aadhaar_num;
      this.DLNUM = data.license_num;
      this.UAN = data.uan_num;
      this.NAMEINBANK = data.name_in_bank;
      this.BANKNAME = data.bank_name;
      this.BRANCHNAME = data.branch_name;
      this.ACCTNUM = data.account_num;
      this.IFSCCODE = data.ifsc_code;
    }
   
     
  }

}

