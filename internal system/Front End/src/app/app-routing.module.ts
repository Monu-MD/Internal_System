import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './capture-module/register/register.component';
import { LoginComponent } from './login-module/login/login.component';
import { ForgotpasswordComponent } from './Reset-module/ForgotPassword/forgotpassword/forgotpassword.component';
import { ChangePasswordComponent } from './Reset-module/change-password/change-password.component';
import { PersonalDetailsComponent } from './capture-module/personal-details/personal-details.component';
import { ProfessionalDetailsComponent } from './capture-module/professional-details/professional-details.component';

import { MessageComponent } from './BirthdayMessage-module/message/message.component';
import { ComposeMessageComponent } from './BirthdayMessage-module/compose-message/compose-message.component';
import { InboxMessageComponent } from './BirthdayMessage-module/inbox-message/inbox-message.component';
import { SentMessageComponent } from './BirthdayMessage-module/sent-message/sent-message.component';

import { AppRejectedReqComponent } from './Travel-module/app-rejected-req/app-rejected-req.component';
import { ApproveReqComponent } from './Travel-module/approve-req/approve-req.component';
import { CancelTravelDetailsComponent } from './Travel-module/cancel-travel-details/cancel-travel-details.component';
import { CancelTravelQueueComponent } from './Travel-module/cancel-travel-queue/cancel-travel-queue.component';
import { TravelComponent } from './Travel-module/travel/travel.component';
import { TravelFAQDetailsComponent } from './Travel-module/travel-faqdetails/travel-faqdetails.component';
import { ViewTravelApprQueueComponent } from './Travel-module/view-travel-appr-queue/view-travel-appr-queue.component';
import { DashboardComponent } from './login-module/dashboard/dashboard.component';
import { AddAppraisalComponent } from './appraisal-module/add-appraisal/add-appraisal.component';
import { AppraisalComponent } from './appraisal-module/appraisal/appraisal.component';
import { RejectedAppraisalComponent } from './appraisal-module/rejected-appraisal/rejected-appraisal.component';
import { ViewAppraisalDataComponent } from './appraisal-module/view-appraisal-data/view-appraisal-data.component';
import { ViewappraisalComponent } from './appraisal-module/viewappraisal/viewappraisal.component';
//bank details

import { ModifyPersonalDetailsComponent } from './employee-module/modify-personal-details/modify-personal-details.component';
import { ModifyProfessionalDetailsComponent } from './employee-module/modify-professional-details/modify-professional-details.component';
import { SearchEmployeeDetailsComponent } from './employee-module/search-employee-details/search-employee-details.component';
import { InitiateRemComponent } from './reimbusment-mdule/initiate-rem/initiate-rem.component';
import { ReimburseApproveComponent } from './reimbusment-mdule/reimburse-approve/reimburse-approve.component';
import { AprDoappraisalComponent } from './appraisal-module/apr-doappraisal/apr-doappraisal.component';
import { CommonCodeDetailsComponent } from './common-code-module/common-code-details/common-code-details.component';
import { CommonCodeDetailsModifyComponent } from './common-code-module/common-code-details-modify/common-code-details-modify.component';
import { ViewCommonCodeComponent } from './common-code-module/view-common-code/view-common-code.component';
import { SearchProjectDetailsComponent } from './mark-module/search-project-details/search-project-details.component';
import { MarkDetailsComponent } from './mark-module/mark-details/mark-details.component';
import { RecallmilestoneComponent } from './mark-module/recallmilestone/recallmilestone.component';
import { ConfigureLeavesComponent } from './holidays-module/configure-leaves/configure-leaves.component';
import { HolidaysComponent } from './holidays-module/holidays/holidays.component';
import { ListOfHolidaysComponent } from './holidays-module/list-of-holidays/list-of-holidays.component';
import { ModifyLeavesComponent } from './holidays-module/modify-leaves/modify-leaves.component';
import { RemoveLeavesComponent } from './holidays-module/remove-leaves/remove-leaves.component';
import { ListOfLeavesComponent } from './holidays-module/viewLeaveData/list-of-leaves.component';
import { AddITAssetDetailsComponent } from './asset-mangement-system-module/add-itasset-details/add-itasset-details.component';
import { AssetDetailsComponent } from './asset-mangement-system-module/asset-details/asset-details.component';
import { AddNonItAssetDetailsComponent } from './asset-mangement-system-module/add-non-it-asset-details/add-non-it-asset-details.component';
import { ITAssetAllocationComponent } from './asset-mangement-system-module/itasset-allocation/itasset-allocation.component';
import { ModifyItAssetDetailsComponent } from './asset-mangement-system-module/modify-it-asset-details/modify-it-asset-details.component';
import { ModifyItAllocationDetailsComponent } from './asset-mangement-system-module/modify-it-allocation-details/modify-it-allocation-details.component';
import { ModifyNonItAssetDetailsComponent } from './asset-mangement-system-module/modify-non-it-asset-details/modify-non-it-asset-details.component';
import { ViewItAssetDetailsComponent } from './asset-mangement-system-module/view-it-asset-details/view-it-asset-details.component';
import { ViewNonItAssetDetailsComponent } from './asset-mangement-system-module/view-non-it-asset-details/view-non-it-asset-details.component';
import { ViewItAllocationDetailsComponent } from './asset-mangement-system-module/view-it-allocation-details/view-it-allocation-details.component';
import { ReportBulkChooseComponent } from './Report-module/report-bulk-choose/report-bulk-choose.component';
import { ReportCompChooseComponent } from './Report-module/report-comp-choose/report-comp-choose.component';
import { ReportCompLeaveBalanceComponent } from './Report-module/report-comp-leave-balance/report-comp-leave-balance.component';
import { ReportDetailsComponent } from './Report-module/report-details/report-details.component';
import { ReportLeaveDetailsValueComponent } from './Report-module/report-leave-details-value/report-leave-details-value.component';
import { AppraisalDataNotApprovedComponent } from './appRenovated-module/appraisal-data-not-approved/appraisal-data-not-approved.component';
import { CreateAppDataComponent } from './appRenovated-module/create-app-data/create-app-data.component';
import { DoAppraisalComponent } from './appRenovated-module/do-appraisal/do-appraisal.component';
import { ModifyAppDataComponent } from './appRenovated-module/modify-app-data/modify-app-data.component';
import { ChooseinvoiceDetailsComponent } from './invoice-module/chooseinvoice-details/chooseinvoice-details.component';
import { GenerateinrReportComponent } from './invoice-module/generateinr-report/generateinr-report.component';
import { GenerateusdReportComponent } from './invoice-module/generateusd-report/generateusd-report.component';
import { InvoicedueListComponent } from './invoice-module/invoicedue-list/invoicedue-list.component';
import { InvoiceFPComponent } from './invoice-module/invoice-fp/invoice-fp.component';
import { InvoicedueTodayComponent } from './invoice-module/invoicedue-today/invoicedue-today.component';
import { InvoicePayComponent } from './invoice-module/invoice-pay/invoice-pay.component';
import { InvoiceRaiseComponent } from './invoice-module/invoice-raise/invoice-raise.component';
import { InvoiceRegeneratechooseComponent } from './invoice-module/invoice-regeneratechoose/invoice-regeneratechoose.component';
import { ReportComponent } from './invoice-module/report/report.component';
import { ChildProjectComponent } from './project-module/child-project/child-project.component';
import { CustomerModificationComponent } from './project-module/customer-modification/customer-modification.component';
import { CustomerViewComponent } from './project-module/customer-view/customer-view.component';
import { CustomercreationComponent } from './project-module/customercreation/customercreation.component';
import { ProjDeallocComponent } from './project-module/proj-dealloc/proj-dealloc.component';
import { ProjectAllocationComponent } from './project-module/project-allocation/project-allocation.component';
import { ProjectDetialComponent } from './project-module/project-detial/project-detial.component';
import { CmsUploadAdminComponent } from './cms-module/cms-upload-admin/cms-upload-admin.component';
import { MagzineUploadAdminComponent } from './cms-module/magzine-upload-admin/magzine-upload-admin.component';
import { PolicyUploadAdminComponent } from './cms-module/policy-upload-admin/policy-upload-admin.component';
import { ApplyLeaveComponent } from './request-module/apply-leave/apply-leave.component';
import { ApproveLeaveComponent } from './request-module/approve-leave/approve-leave.component';
import { LeaveBalanceComponent } from './request-module/leave-balance/leave-balance.component';
import { LeaveSummaryComponent } from './request-module/leave-summary/leave-summary.component';
import { MarkLeaveComponent } from './request-module/mark-leave/mark-leave.component';
import { UnMarkLeaveComponent } from './request-module/un-mark-leave/un-mark-leave.component';
import { ViewHolidaysComponent } from './request-module/view-holidays/view-holidays.component';
import { ViewLeaveComponent } from './request-module/view-leave/view-leave.component';
import { CommonCodeDetailsDeleteComponent } from './common-code-module/common-code-details-delete/common-code-details-delete.component';
import { ReimbusmentReqDetailsComponent } from './reimbusment-mdule/reimbusment-req-details/reimbusment-req-details.component';
import { EmpProfessionalDetailsComponent } from './employee-module/emp-professional-details/emp-professional-details.component';
import { EmployeeDetailsComponent } from './employee-module/employee-details/employee-details.component';
import { ViewItAssetDetailComponent } from './asset-mangement-system-module/view-it-asset-detail/view-it-asset-detail.component'
import { ViewNonItAssetDetailComponent } from './asset-mangement-system-module/view-non-it-asset-detail/view-non-it-asset-detail.component';
import { ViewItAllocationDeatilComponent } from './asset-mangement-system-module/view-it-allocation-deatil/view-it-allocation-deatil.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { CancelLeaveComponent } from './request-module/cancel-leave/cancel-leave.component';
import { ViewDocumentsComponent } from './cms-module/view-documents/view-documents.component';
import { ViewMagzineComponent } from './cms-module/view-magzine/view-magzine.component';
import { ViewPolicyComponent } from './cms-module/view-policy/view-policy.component';   
import{ProjectDocumentComponent}from './project-module/project-document/project-document.component' 
import { DocAppRejComponent } from './cms-module/doc-app-rej/doc-app-rej.component';
import { SearchEmployeeComponent } from './cms-module/search-employee/search-employee.component';    
import { FAQComponent } from './faq/faq.component';

const routes: Routes = [
  { path: 'faq', component: FAQComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },

  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgotPassword', component: ForgotpasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'personalDetails', component: PersonalDetailsComponent },
  { path: 'professionalDetails', component: ProfessionalDetailsComponent },

  // Abhi 

  //appraisal
  { path: 'addappraisal', component: AddAppraisalComponent },
  { path: 'appraisalcomponent', component: AppraisalComponent },
  { path: 'doappraisal', component: AprDoappraisalComponent },
  { path: 'rejapr', component: RejectedAppraisalComponent },
  { path: 'viewapldata', component: ViewAppraisalDataComponent },
  { path: 'viewaprl', component: ViewappraisalComponent },

  // reimbusment

  { path: 'initiaterem', component: InitiateRemComponent },
  { path: 'reimbusmentapprove', component: ReimburseApproveComponent },
  { path: "reimbusmentreqdetails", component: ReimbusmentReqDetailsComponent },

  { path: 'ReportChooseComponent', component: ReportBulkChooseComponent },
  { path: 'Reportcompchoose', component: ReportCompChooseComponent },
  { path: 'reportcomleavebal', component: ReportCompLeaveBalanceComponent },
  { path: 'reportdetails', component: ReportDetailsComponent },
  { path: 'reportleavedetails', component: ReportLeaveDetailsValueComponent },

  //emp module

  { path: 'modifypersonal', component: ModifyPersonalDetailsComponent },
  { path: 'modifyprofessional', component: ModifyProfessionalDetailsComponent },
  { path: 'searchmodify', component: SearchEmployeeDetailsComponent },
  { path: 'empProfessional', component: EmpProfessionalDetailsComponent },
  { path: "empDetailview", component: EmployeeDetailsComponent },

  //invoice
  { path: 'chooseinvoice', component: ChooseinvoiceDetailsComponent },
  { path: 'generateinrreport', component: GenerateinrReportComponent },
  { path: 'generateusdreport', component: GenerateusdReportComponent },
  { path: 'invoiceduelist', component: InvoicedueListComponent },
  { path: 'invoiceduetoday', component: InvoicedueTodayComponent },
  { path: 'invoicefp', component: InvoiceFPComponent },
  { path: 'invoicepay', component: InvoicePayComponent },
  { path: 'invoiceraise', component: InvoiceRaiseComponent },
  { path: 'invoicegenarate', component: InvoiceRegeneratechooseComponent },
  { path: 'reportinv', component: ReportComponent },

  //project
  { path: 'childproject', component: ChildProjectComponent },
  { path: 'CustomerModification', component: CustomerModificationComponent },
  { path: 'CustomerView', component: CustomerViewComponent },
  { path: 'Customercreation', component: CustomercreationComponent },
  { path: 'ProjDealloc', component: ProjDeallocComponent },
  { path: 'ProjectAllocation', component: ProjectAllocationComponent },
  { path: 'ProjectDetial', component: ProjectDetialComponent },
  { path: 'ProjectDoc', component: ProjectDocumentComponent },

  //jadhav
  { path: 'message', component: MessageComponent },
  { path: 'composeMessage', component: ComposeMessageComponent },
  { path: 'inbox', component: InboxMessageComponent },
  { path: 'sent', component: SentMessageComponent },
  //Travel
  { path: 'apprejected', component: AppRejectedReqComponent },
  { path: 'approvereq', component: ApproveReqComponent },
  { path: 'canceltvldet', component: CancelTravelDetailsComponent },
  { path: 'canceltvlque', component: CancelTravelQueueComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'travelfaq', component: TravelFAQDetailsComponent },
  { path: 'viewtvl', component: ViewTravelApprQueueComponent },
  //AppRenovated
  { path: 'appDataNot', component: AppraisalDataNotApprovedComponent },
  { path: 'cteApp', component: CreateAppDataComponent },
  { path: 'doApp', component: DoAppraisalComponent },
  { path: 'modapp', component: ModifyAppDataComponent },

  //Request
  { path: 'applyLev', component: ApplyLeaveComponent },
  { path: 'approveLev', component: ApproveLeaveComponent },
  { path: 'levBal', component: LeaveBalanceComponent },
  { path: 'levSum', component: LeaveSummaryComponent },
  { path: 'markLev', component: MarkLeaveComponent },
  { path: 'unmarkLev', component: UnMarkLeaveComponent },
  { path: 'viewHol', component: ViewHolidaysComponent },
  { path: 'viewLev', component: ViewLeaveComponent },
  { path: 'viewLevCancel', component: CancelLeaveComponent },

  //cms
  { path: 'cmsUpload', component: CmsUploadAdminComponent },
  { path: 'magzineUpld', component: MagzineUploadAdminComponent },
  { path: 'policyupld', component: PolicyUploadAdminComponent },

  {path:'viewDocs',component: ViewDocumentsComponent},
  {path:'viewMagz',component:ViewMagzineComponent},
  {path:'viewPolcy',component:ViewPolicyComponent},
  {path:'docAppRej',component:DocAppRejComponent},
  {path:'searchEmp',component:SearchEmployeeComponent},
  
  

  //mahesh
  { path: 'cocd', component: CommonCodeDetailsComponent },
  { path: 'modifycocd', component: CommonCodeDetailsModifyComponent },
  { path: 'deletecocd', component: CommonCodeDetailsDeleteComponent },
  { path: 'viewcocd', component: ViewCommonCodeComponent },

  { path: 'searchMrk', component: SearchProjectDetailsComponent },
  { path: 'mrk', component: MarkDetailsComponent },
  { path: 'recall', component: RecallmilestoneComponent },

  { path: 'configLeave', component: ConfigureLeavesComponent },
  { path: 'addHolidays', component: HolidaysComponent },
  { path: 'viewHolidays', component: ListOfHolidaysComponent },
  { path: 'modifyLeave', component: ModifyLeavesComponent },
  { path: 'removeLeave', component: RemoveLeavesComponent },
  { path: 'ListLeave', component: ListOfLeavesComponent },

  { path: 'AssetDetails', component: AssetDetailsComponent },

  { path: 'ItAssetDetails', component: AddITAssetDetailsComponent },
  { path: 'ModifyItAssetDetails', component: ModifyItAssetDetailsComponent },
  { path: 'ViewItAssetDetails', component: ViewItAssetDetailsComponent },
  { path: 'ViewItAssetDetail', component: ViewItAssetDetailComponent },


  { path: 'ITAssetAllocation', component: ITAssetAllocationComponent },
  { path: 'ModifyItAllocationDetails', component: ModifyItAllocationDetailsComponent },
  { path: 'ViewItAllocationDetails', component: ViewItAllocationDetailsComponent },
  { path: 'ViewItAllocationDetail', component: ViewItAllocationDeatilComponent },

  { path: 'AddNonItAssetDetails', component: AddNonItAssetDetailsComponent },
  { path: 'ModifyNonItAssetDetails', component: ModifyNonItAssetDetailsComponent },
  { path: 'ViewNonItAssetDetails', component: ViewNonItAssetDetailsComponent },
  { path: 'ViewNonItAssetDetail', component: ViewNonItAssetDetailComponent },



  { path: 'ITAssetAllocation', component: ITAssetAllocationComponent },
  { path: 'ModifyItAllocationDetails', component: ModifyItAllocationDetailsComponent },
  { path: 'ViewItAllocationDetails', component: ViewItAllocationDetailsComponent },
  { path: 'ViewItAllocationDetail', component: ViewItAllocationDeatilComponent },

  { path: 'AddNonItAssetDetails', component: AddNonItAssetDetailsComponent },
  { path: 'ModifyNonItAssetDetails', component: ModifyNonItAssetDetailsComponent },
  { path: 'ViewNonItAssetDetails', component: ViewNonItAssetDetailsComponent },
  { path: 'ViewNonItAssetDetail', component: ViewNonItAssetDetailComponent }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
