import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --------------------------------    Md & Abhi's  ------------------------------------------- 

import { LoginComponent } from './login-module/login/login.component';
import { PersonalDetailsComponent } from '../app/capture-module/personal-details/personal-details.component';
import { ProfessionalDetailsComponent } from '../app/capture-module/professional-details/professional-details.component';
import { RegisterComponent } from '../app/capture-module/register/register.component'
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../app/common/footer/footer.component'
import { HeadderComponent } from '../app/common/headder/headder.component'
import { SidebarComponent } from '../app/common/sidebar/sidebar.component';
import { ChildProjectComponent } from '../app/project-module/child-project/child-project.component'
import { ApiserviceService } from './apiservice.service';
import { CustomercreationComponent } from './project-module/customercreation/customercreation.component';
import { CustomerModificationComponent } from './project-module/customer-modification/customer-modification.component';
import { CustomerModViewComponent } from './project-module/customer-mod-view/customer-mod-view.component';
import { CustomerViewComponent } from './project-module/customer-view/customer-view.component';
import { ProjectDetialComponent } from './project-module/project-detial/project-detial.component';
import { ProjDeallocComponent } from './project-module/proj-dealloc/proj-dealloc.component';
import { ProjectAllocationComponent } from './project-module/project-allocation/project-allocation.component';
import { InitiateRemComponent } from './reimbusment-mdule/initiate-rem/initiate-rem.component';
import { ReimburseApproveComponent } from './reimbusment-mdule/reimburse-approve/reimburse-approve.component';
import { CmsUploadAdminComponent } from './cms-module/cms-upload-admin/cms-upload-admin.component';
import { PolicyUploadAdminComponent } from './cms-module/policy-upload-admin/policy-upload-admin.component';
import { MagzineUploadAdminComponent } from './cms-module/magzine-upload-admin/magzine-upload-admin.component';
import { AddAppraisalComponent } from './appraisal-module/add-appraisal/add-appraisal.component';
import { AppraisalComponent } from '../app/appraisal-module/appraisal/appraisal.component';
import { RejectedAppraisalComponent } from './appraisal-module/rejected-appraisal/rejected-appraisal.component';
import { ViewappraisalComponent } from './appraisal-module/viewappraisal/viewappraisal.component';
import { AprDoappraisalComponent } from './appraisal-module/apr-doappraisal/apr-doappraisal.component';
import { ViewAppraisalDataComponent } from '../app/appraisal-module/view-appraisal-data/view-appraisal-data.component';
import { ReimbusmentReqDetailsComponent } from './reimbusment-mdule/reimbusment-req-details/reimbusment-req-details.component';

// --------------------------------    Mahesh ------------------------------------------- 

import { AssetDetailsComponent } from '../app/asset-mangement-system-module/asset-details/asset-details.component';
import { AddITAssetDetailsComponent } from '../app/asset-mangement-system-module/add-itasset-details/add-itasset-details.component';
import { AddNonItAssetDetailsComponent } from '../app/asset-mangement-system-module/add-non-it-asset-details/add-non-it-asset-details.component';
import { ITAssetAllocationComponent } from './asset-mangement-system-module/itasset-allocation/itasset-allocation.component';
import { ModifyItAllocationDetailsComponent } from '../app/asset-mangement-system-module/modify-it-allocation-details/modify-it-allocation-details.component';
import { ModifyItAssetDetailsComponent } from '../app/asset-mangement-system-module/modify-it-asset-details/modify-it-asset-details.component';
import { ModifyNonItAssetDetailsComponent } from '../app/asset-mangement-system-module/modify-non-it-asset-details/modify-non-it-asset-details.component';
import { SearchAssetIdComponent } from './asset-mangement-system-module/search-asset-id/search-asset-id.component';
import { SearchEmpIdAssetComponent } from './asset-mangement-system-module/search-emp-id-asset/search-emp-id-asset.component';
import { ViewItAssetDetailsComponent } from './asset-mangement-system-module/view-it-asset-details/view-it-asset-details.component';
import { ViewNonItAssetDetailsComponent } from './asset-mangement-system-module/view-non-it-asset-details/view-non-it-asset-details.component';
import { ViewItAllocationDetailsComponent } from './asset-mangement-system-module/view-it-allocation-details/view-it-allocation-details.component';
import { ViewItAssetDetailComponent } from './asset-mangement-system-module/view-it-asset-detail/view-it-asset-detail.component'
import { ViewNonItAssetDetailComponent } from './asset-mangement-system-module/view-non-it-asset-detail/view-non-it-asset-detail.component'
import { ViewItAllocationDeatilComponent } from './asset-mangement-system-module/view-it-allocation-deatil/view-it-allocation-deatil.component'

import { BankDetailsComponent } from '../app/employee-module/BankDetails/bank-details/bank-details.component';
import { ModifyPersonalDetailsComponent } from '../app/employee-module/modify-personal-details/modify-personal-details.component';
import { ModifyProfessionalDetailsComponent } from '../app/employee-module/modify-professional-details/modify-professional-details.component';
import { SearchEmployeeDetailsComponent } from '../app/employee-module/search-employee-details/search-employee-details.component';

import { CommonCodeDetailsComponent } from '../app/common-code-module/common-code-details/common-code-details.component';
import { CommonCodeDetailsDeleteComponent } from '../app/common-code-module/common-code-details-delete/common-code-details-delete.component';
import { CommonCodeDetailsModifyComponent } from '../app/common-code-module/common-code-details-modify/common-code-details-modify.component';
import { ViewCommonCodeComponent } from '../app/common-code-module/view-common-code/view-common-code.component';

import { ConfigureLeavesComponent } from './holidays-module/configure-leaves/configure-leaves.component';
import { HolidaysComponent } from './holidays-module/holidays/holidays.component';
import { ListOfHolidaysComponent } from './holidays-module/list-of-holidays/list-of-holidays.component';
import { ModifyLeavesComponent } from './holidays-module/modify-leaves/modify-leaves.component';
import { RemoveLeavesComponent } from './holidays-module/remove-leaves/remove-leaves.component';
import { ListOfLeavesComponent } from './holidays-module/viewLeaveData/list-of-leaves.component';

import { ChooseinvoiceDetailsComponent } from '../app/invoice-module/chooseinvoice-details/chooseinvoice-details.component';
import { GenerateinrReportComponent } from '../app/invoice-module/generateinr-report/generateinr-report.component';
import { GenerateusdReportComponent } from '../app/invoice-module/generateusd-report/generateusd-report.component';
import { InvoicedueListComponent } from '../app/invoice-module/invoicedue-list/invoicedue-list.component';
import { InvoicedueTodayComponent } from '../app/invoice-module/invoicedue-today/invoicedue-today.component';
import { InvoiceFPComponent } from '../app/invoice-module/invoice-fp/invoice-fp.component';
import { InvoicePayComponent } from '../app/invoice-module/invoice-pay/invoice-pay.component';
import { InvoiceRaiseComponent } from '../app/invoice-module/invoice-raise/invoice-raise.component';
import { InvoiceRegeneratechooseComponent } from '../app/invoice-module/invoice-regeneratechoose/invoice-regeneratechoose.component';
import { ReportComponent } from '../app/invoice-module/report/report.component';

import { MarkDetailsComponent } from '../app/mark-module/mark-details/mark-details.component'
import { RecallmilestoneComponent } from '../app/mark-module/recallmilestone/recallmilestone.component'
import { SearchProjectDetailsComponent } from '../app/mark-module/search-project-details/search-project-details.component'

import { ApplyLeaveComponent } from '../app/request-module/apply-leave/apply-leave.component';
import { ViewLeaveComponent } from '../app/request-module/view-leave/view-leave.component';
import { ApproveLeaveComponent } from '../app/request-module/approve-leave/approve-leave.component';
import { LeaveBalanceComponent } from '../app/request-module/leave-balance/leave-balance.component';
import { ViewHolidaysComponent } from '../app/request-module/view-holidays/view-holidays.component';
import { LeaveSummaryComponent } from '../app/request-module/leave-summary/leave-summary.component';
import { MarkLeaveComponent } from '../app/request-module/mark-leave/mark-leave.component';
import { UnMarkLeaveComponent } from '../app/request-module/un-mark-leave/un-mark-leave.component';






// --------------------------------    Jadhav  ------------------------------------------- 

import { ReportBulkChooseComponent } from '../app/Report-module/report-bulk-choose/report-bulk-choose.component'
import { ReportCompChooseComponent } from '../app/Report-module/report-comp-choose/report-comp-choose.component'
import { ReportCompLeaveBalanceComponent } from '../app/Report-module/report-comp-leave-balance/report-comp-leave-balance.component'
import { ReportDetailsComponent } from '../app/Report-module/report-details/report-details.component'
import { ReportLeaveDetailsValueComponent } from '../app/Report-module/report-leave-details-value/report-leave-details-value.component'


import { AppraisalDataNotApprovedComponent } from './appRenovated-module/appraisal-data-not-approved/appraisal-data-not-approved.component';
import { CreateAppDataComponent } from './appRenovated-module/create-app-data/create-app-data.component';
import { DoAppraisalComponent } from './appRenovated-module/do-appraisal/do-appraisal.component';
import { ModifyAppDataComponent } from './appRenovated-module/modify-app-data/modify-app-data.component';


import { MessageComponent } from './BirthdayMessage-module/message/message.component';
import { SentMessageComponent } from './BirthdayMessage-module/sent-message/sent-message.component';
import { ComposeMessageComponent } from './BirthdayMessage-module/compose-message/compose-message.component';
import { InboxMessageComponent } from './BirthdayMessage-module/inbox-message/inbox-message.component';


import { ForgotpasswordComponent } from './Reset-module/ForgotPassword/forgotpassword/forgotpassword.component';
import { ChangePasswordComponent } from './Reset-module/change-password/change-password.component';
import { AppRejectedReqComponent } from './Travel-module/app-rejected-req/app-rejected-req.component';
import { ApproveReqComponent } from './Travel-module/approve-req/approve-req.component';
import { CancelTravelDetailsComponent } from './Travel-module/cancel-travel-details/cancel-travel-details.component';
import { CancelTravelQueueComponent } from './Travel-module/cancel-travel-queue/cancel-travel-queue.component';
import { TravelComponent } from './Travel-module/travel/travel.component';
import { TravelFAQDetailsComponent } from './Travel-module/travel-faqdetails/travel-faqdetails.component';
import { ViewTravelApprQueueComponent } from './Travel-module/view-travel-appr-queue/view-travel-appr-queue.component';



import { TopbarComponent } from './common/topbar/topbar.component';
import { DashboardComponent } from './login-module/dashboard/dashboard.component';
import { EmpPersonalDetailsComponent } from './employee-module/emp-personal-details/emp-personal-details.component';
import { EmpProfessionalDetailsComponent } from './employee-module/emp-professional-details/emp-professional-details.component';
import { EmployeeDetailsComponent } from './employee-module/employee-details/employee-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    PersonalDetailsComponent,
    ProfessionalDetailsComponent,
    RegisterComponent,
    HeadderComponent,
    FooterComponent,
    SidebarComponent,
    ChildProjectComponent,
    CustomercreationComponent,
    CustomerModificationComponent,
    CustomerModViewComponent,
    CustomerViewComponent,
    ProjectDetialComponent,
    ProjDeallocComponent,
    ProjectAllocationComponent,
    InitiateRemComponent,
    ReimburseApproveComponent,
    CmsUploadAdminComponent,
    PolicyUploadAdminComponent,
    MagzineUploadAdminComponent,
    AddAppraisalComponent,
    AppraisalComponent,
    RejectedAppraisalComponent,
    ViewappraisalComponent,
    ViewAppraisalDataComponent,
    AprDoappraisalComponent,
    ReimbusmentReqDetailsComponent,
    EmpPersonalDetailsComponent,
    EmpProfessionalDetailsComponent,
    


    // Mahesh

    AddITAssetDetailsComponent,
    AddNonItAssetDetailsComponent,
    AssetDetailsComponent,
    ITAssetAllocationComponent,
    ModifyItAllocationDetailsComponent,
    ModifyItAssetDetailsComponent,
    ModifyNonItAssetDetailsComponent,
    SearchAssetIdComponent,
    SearchEmpIdAssetComponent,
    ViewItAssetDetailsComponent,
    ViewNonItAssetDetailsComponent,
    ViewItAllocationDetailsComponent,
    ViewItAssetDetailComponent,
    ViewNonItAssetDetailComponent,
    ViewItAllocationDeatilComponent,


    CommonCodeDetailsComponent,
    CommonCodeDetailsDeleteComponent,
    CommonCodeDetailsModifyComponent,
    ViewCommonCodeComponent,

    ModifyProfessionalDetailsComponent,
    ModifyPersonalDetailsComponent,
    SearchEmployeeDetailsComponent,

    ConfigureLeavesComponent,
    HolidaysComponent,
    ListOfHolidaysComponent,
    ModifyLeavesComponent,
    RemoveLeavesComponent,
    ListOfLeavesComponent,

    ChooseinvoiceDetailsComponent,
    GenerateinrReportComponent,
    GenerateusdReportComponent,
    InvoicedueListComponent,
    InvoicedueTodayComponent,
    InvoiceFPComponent,
    InvoicePayComponent,
    InvoiceRaiseComponent,
    InvoiceRegeneratechooseComponent,
    ReportComponent,

    MarkDetailsComponent,
    RecallmilestoneComponent,
    SearchProjectDetailsComponent,


    ApplyLeaveComponent,
    ViewLeaveComponent,
    ApproveLeaveComponent,
    LeaveBalanceComponent,
    ViewHolidaysComponent,
    LeaveSummaryComponent,
    MarkLeaveComponent,
    UnMarkLeaveComponent,


    // Jadhav
    ReportBulkChooseComponent,
    ReportCompChooseComponent,
    ReportCompLeaveBalanceComponent,
    ReportDetailsComponent,
    ReportLeaveDetailsValueComponent,

    AppraisalDataNotApprovedComponent,
    CreateAppDataComponent,
    DoAppraisalComponent,
    ModifyAppDataComponent,

    MessageComponent,
    SentMessageComponent,
    ComposeMessageComponent,
    InboxMessageComponent,

    BankDetailsComponent,

    ForgotpasswordComponent,
    ChangePasswordComponent,

    AppRejectedReqComponent,
    ApproveReqComponent,
    CancelTravelDetailsComponent,
    CancelTravelQueueComponent,
    TravelComponent,
    TravelFAQDetailsComponent,
    ViewTravelApprQueueComponent,


    // TopBar 
    TopbarComponent,
     DashboardComponent,
     EmployeeDetailsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    MatSnackBarModule // Add MatSnackBarModule
    
  ],
  
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
