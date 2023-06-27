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



  cflag: any;
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

      // Assigning values from emp_details to class properties
      const data = emp_details[4]; // Assuming emp_details[4] contains the data object
      this.cflag = data.del_flg;
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
      this.BGROUP = data.bgroup;
      this.SHIRT = data.shirt;
      this.COMMADD = data.commadd;
      this.STATE = data.state;
      this.CITY = data.city;
      this.PINCODE = data.pincode;
      this.RESADD = data.resadd;
      this.STATE1 = data.state1;
      this.CITY1 = data.city1;
      this.PINCODE1 = data.pincode1;
      this.MOBNUM = data.mobnum;
      this.TELNUM = data.telnum;
      this.ECONNUM = data.econnum;
      this.EMERPER = data.emerper;
      this.FATHERSNAME = data.fathersname;
      this.MOTHERSNAME = data.mothersname;
      this.MARITALSTATUS = data.maritalstatus;
      this.SPOUSENAME = data.spousename;
      this.PANNUM = data.pannum;
      this.PASSNUM = data.passnum;
      this.AADHAARNUM = data.aadhaarnum;
      this.DLNUM = data.dlnum;
      this.UAN = data.uan;
      this.NAMEINBANK = data.nameinbank;
      this.BANKNAME = data.bankname;
      this.BRANCHNAME = data.branchname;
      this.ACCTNUM = data.acctnum;
      this.IFSCCODE = data.ifsccode;
    }
    if (this.empDet.getEmpDet() != null) {
      const Data = this.empDet.getEmpDet()
      var data=Data[0];
      this.cflag = data.cflag;
      this.EMPID = data.empid;
      this.EMPNAME = data.empName;
      this.email = data.email;
      this.EMPACCESS = data.empAccess;
      this.JDATE = data.jDate;
      this.DESIG = data.desig;
      this.EMPCLASS = data.empClass;
      this.SALARY = data.salary;
      this.SALARY_CURR = data.salary_curr;
      this.SALARY_CURR_DESC = data.salary_curr_desc;
      this.PID = data.pid;
      this.rptMan = data.rptMan;
      // this.RPTMAN = data.rptman;
      this.RPTMAN_DESC = data.rptMan_desc;
      this.PROBPERIOD = data.probPeriod;
      this.PREEM = data.preem;
      this.PREEXPYEAR = data.preExpyear;
      this.PREEXPMONTH = data.prevExpmonth;
      this.PREEMP = data.preEmp;
      this.PREEMP2 = data.preEmp2;
      this.PREEMP3 = data.preEmp3;
      this.PREEMP4 = data.preEmp4;
      this.PREEMP5 = data.preEmp5;
      // this.enFlg = data.entity_cre_flg;
      this.GENDER = data.gender;
      this.DOB = data.dob;
      this.BGROUP = data.bgroup;
      this.SHIRT = data.shirt;
      this.COMMADD = data.commAdd;
      this.STATE = data.state;
      this.CITY = data.city;
      this.PINCODE = data.pincode;
      this.RESADD = data.resAdd;
      this.STATE1 = data.state1;
      this.CITY1 = data.city1;
      this.PINCODE1 = data.pincode1;
      this.MOBNUM = data.mobNum;
      this.TELNUM = data.telNum;
      this.ECONNUM = data.econNum;
      this.EMERPER = data.emerPer;
      this.FATHERSNAME = data.fathersName;
      this.MOTHERSNAME = data.mothersName;
      this.MARITALSTATUS = data.maritalstatus;
      this.SPOUSENAME = data.spouseName;
      this.PANNUM = data.panNum;
      this.PASSNUM = data.passNum;
      this.AADHAARNUM = data.aadhaarNum;
      this.DLNUM = data.dlNum;
      this.UAN = data.uan;
      this.NAMEINBANK = data.nameinBank;
      this.BANKNAME = data.bankName;
      this.BRANCHNAME = data.branchName;
      this.ACCTNUM = data.acctNum;
      this.IFSCCODE = data.ifscCode;
    }
  }

}

