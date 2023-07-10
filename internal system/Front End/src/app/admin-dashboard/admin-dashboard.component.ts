import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
user_id:any;
user_type:any;

 
  claimPendngCount=0;
  bdayCount=0;
  docPendingCount=0;
  emp_main=0;
  pending_empPer=0;
  invoice_main=0;
  pending_invoiceDue=0;
  pending_invoiceRaise=0;
  pending_invoicePay=0;
  total_leave_count=0;
  leave_tobe_approved=0;
  leave_to_approve=0;
  trvlPendngCount=0;
  trvlPendngRowData=0;
  appraisal_main=0;
  app_notApproved=0;
  app_pendingAccep=0;
  app_rejPendClosure=0;
  onlineCount=0;
  claimPendngHrCount=0;
  

  
  constructor(private loginservice:LoginServiceService)
  {
  
    const adminDasboard=this.loginservice.getData();
    this.user_id=adminDasboard[0];
    this.user_type=adminDasboard[2];
    const Data=adminDasboard[7];
    
    this.claimPendngCount = Data.claimPendngCount;
    this.bdayCount = Data.bdayCount;
    this.docPendingCount = Data.docPendingCount;
    this.emp_main = Data.emp_main;
    this.pending_empPer = Data.pending_empPer;
    this.invoice_main = Data.invoice_main;
    this.pending_invoiceDue = Data.pending_invoiceDue;
    this.pending_invoiceRaise = Data.pending_invoiceRaise;
    this.pending_invoicePay = Data.pending_invoicePay;
    this.total_leave_count = Data.total_leave_count;
    this.leave_tobe_approved = Data.leave_tobe_approved;
    this.leave_to_approve = Data.leave_to_approve;
    this.trvlPendngCount = Data.trvlPendngCount;
    this.trvlPendngRowData = Data.trvlPendngRowData;
    this.appraisal_main = Data.appraisal_main;
    this.app_notApproved = Data.app_notApproved;
    this.app_pendingAccep = Data.app_pendingAccep;
    this.app_rejPendClosure = Data.app_rejPendClosure;
    this.onlineCount = Data.onlineCount;
    this.claimPendngHrCount = Data.claimPendngHrCount;
    
    
  }


}
