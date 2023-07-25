import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApprvalServicesService } from 'src/app/services/apprval-services.service';
import { EmpdetaislService } from 'src/app/services/employeeDetails/empdetaisl.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  user_id: any;
  user_type: any;
  user_name: any;
  viewaproval: any;

  showRejectInput: boolean;
  rejectionReason: string;

  showDeleteInput: boolean;
  deleteReason: string;


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

  notification: any;
  constructor(private loginservice: LoginServiceService, private empDet: EmpdetaislService, private router: Router, private approvalservice: ApprvalServicesService, private http: HttpClient,) {
    this.showRejectInput = false;
    this.rejectionReason = '';


    this.showDeleteInput = false;
    this.deleteReason = '';



    const emp_details = this.loginservice.getData();
    this.viewaproval = emp_details[9]
    this.user_id = emp_details[0];
   

    this.user_type = emp_details[2]
    if (this.viewaproval === "viewData") {

      console.log("emp", emp_details[4]);
      if (emp_details[4] != null) {


        const data = emp_details[4];

        this.EMPID = data.empid;
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
    else if (this.viewaproval === "aprovalView") {
      console.log("inside");

      const viewAprovalData = this.approvalservice.getapprovalview();
      const personalAproval = viewAprovalData[0];
      const professionalAproval = viewAprovalData[1]
      console.log(personalAproval);
      console.log(professionalAproval);
      ////////////// Professional Details//////////////////////////
      this.email = professionalAproval.email;
      this.EMPACCESS = professionalAproval.empAccess;
      this.JDATE = professionalAproval.jDate;
      this.DESIG = professionalAproval.desig_desc;
      this.EMPCLASS = professionalAproval.empClass
      this.SALARY = professionalAproval.salary;
      this.SALARY_CURR_DESC = professionalAproval.salary_curr;
      this.rptMan = professionalAproval.rptMan;
      this.RPTMAN_DESC = professionalAproval.rptMan_desc;
      this.PROBPERIOD = professionalAproval.probPeriod;
      this.PREEM = professionalAproval.preem;
      this.PREEXPYEAR = professionalAproval.preExpyear;
      this.PREEXPMONTH = professionalAproval.preExpmonth;
      this.PREEMP = professionalAproval.preEmp;
      this.PREEMP2 = professionalAproval.preEmp2;
      this.PREEMP3 = professionalAproval.preEmp3;
      this.PREEMP4 = professionalAproval.preEmp4;
      this.PREEMP5 = professionalAproval.preEmp5;
      ///////////[ersonal Details/////////////////////////////]

      this.EMPID = personalAproval.empid;
      this.EMPNAME = personalAproval.empName;
      this.GENDER = personalAproval.gender;
      this.DOB = personalAproval.dob;
      this.BGROUP = personalAproval.bgroup;
      this.SHIRT = personalAproval.shirt;
      this.COMMADD = personalAproval.commAdd;
      this.STATE1 = personalAproval.state;
      this.CITY1 = personalAproval.city;
      this.PINCODE1 = personalAproval.pincode;
      this.MOBNUM = personalAproval.mobNum;
      this.TELNUM = personalAproval.telNum;
      this.ECONNUM = personalAproval.econNum;
      this.EMERPER = personalAproval.emerPer;
      this.FATHERSNAME = personalAproval.fathersName;
      this.MOTHERSNAME = personalAproval.mothersName;
      this.MARITALSTATUS = personalAproval.maritalstatus;
      this.SPOUSENAME = personalAproval.spouseName;
      this.PANNUM = personalAproval.panNum;
      this.PASSNUM = personalAproval.passNum;
      this.AADHAARNUM = personalAproval.aadhaarNum;
      this.DLNUM = personalAproval.dlNum;
      this.UAN = personalAproval.uan;
      this.NAMEINBANK = personalAproval.nameinBank;
      this.BANKNAME = personalAproval.bankName;
      this.BRANCHNAME = personalAproval.branchName;
      this.ACCTNUM = personalAproval.acctNum;
      this.IFSCCODE = personalAproval.ifscCode;
    }
    ////////////////////////////////////////// to view Approval ///////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

  }



  openRejectInput() {
    this.showRejectInput = true;
    this.rejectionReason = '';
  }
  ///////////////////////////// rejection api//////////////////////////////////////////////////

  rejectProfile() {
    // Add your logic here for rejecting the profile
    console.log('Profile rejected for Employee ID:', this.EMPID);
    console.log('Rejection Reason:', this.rejectionReason);
    // Perform rejection operations here

    const data = {
      user_id: this.EMPID,
      rejReason: this.rejectionReason,
      test: 'Reject Profile'
    }


    this.http.post('http://localhost:4000/employeeDetails/verifyDetails', data).subscribe(
      (response: any) => {
        alert(response.notification)

        console.log(response.message);
        console.log(response.notification);



        // if (response.message == 'redirect to login') {

        //   this.router.navigate(['/'])

        // }
        // if (response.message == 'redirect to reset') {

        //   this.router.navigate(['/changePassword'])

        // }
      },
      (error: any) => {
        console.error('API Error:', error);
        console.log(this.notification);


      }
    );

    // Reset input and hide
    this.showRejectInput = false;
    this.rejectionReason = '';
  }

  openDeleteInput() {
    this.showDeleteInput = true;
    this.deleteReason = '';
  }
  ///////////////////////////// delete api//////////////////////////////////////////////////

  deleteProfile() {
    // Add your logic here for deleting the profile
    console.log('Profile deleted for Employee ID:', this.EMPID);
    console.log('Delete Reason:', this.deleteReason);

    // Perform deletion operations here
    const data = {
      user_id: this.EMPID,
      deleteReason: this.deleteReason,
      test: 'Delete Profile'
    }


    this.http.post('http://localhost:4000/employeeDetails/verifyDetails', data).subscribe(
      (response: any) => {
        alert(response.notification)

        console.log(response.message);
        console.log(response.notification);



        // if (response.message == 'redirect to login') {

        //   this.router.navigate(['/'])

        // }
        // if (response.message == 'redirect to reset') {

        //   this.router.navigate(['/changePassword'])

        // }
      },
      (error: any) => {
        console.error('API Error:', error);
        console.log(this.notification);


      }
    );

    // Reset input and hide
    this.showDeleteInput = false;
    this.deleteReason = '';
  }
  ///////////////////////////// Aprove api//////////////////////////////////////////////////

  approveProfile() {
    // Add your logic here for approving the profile
    console.log('Profile approved for Employee ID:', this.EMPID);
    const data = {
      user_id: this.EMPID,

      test: 'Verify Profile'
    }
    // Perform approval operations here
    this.http.post('http://localhost:4000/employeeDetails/verifyDetails', data).subscribe(
      (response: any) => {
       

        console.log(response.message);
        console.log(response.notification);



        if (response.message == 'redirect ot aprove view page') {

          this.router.navigate(['/admindashboard'])

        }
       
      },
      (error: any) => {
        console.error('API Error:', error);
        console.log(this.notification);


      }
    );
  }


}






