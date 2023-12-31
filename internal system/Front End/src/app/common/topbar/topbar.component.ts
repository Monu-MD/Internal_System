import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AssetServiceService } from 'src/app/services/asset-service.service';
import { CmsService } from 'src/app/services/cms.service';
import { CocdService } from 'src/app/services/cocd.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { NavserviceService } from 'src/app/services/navservice.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';
import { ReimbursementserviceService } from 'src/app/services/reimbursementservice.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  data: any;
  user_type: any;
  user_id: any;



  redirect() {

  }
  constructor(private service: NavserviceService, private http: HttpClient,
    private router: Router, private loginService: LoginServiceService,
    private prjectservice: ProjectserviceService,

    private trvelService: TravelServiceService,private reimbusmentservice:ReimbursementserviceService,
    private cocdService:CocdService,private assetService:AssetServiceService,
    private cmsService:CmsService) {

    /// redirect data or id ///
    this.data = this.service.returrnAns;
    console.log("Topbar Enterd");

    console.log(this.service.returrnAns());
    const user = this.loginService.getData();
    this.user_type = user[2];
    this.user_id = user[0];
    console.log(this.user_type);



    //// to enable and disable //

    this.data = this.service.returrnAns();
    console.log("Topbar Enterd with:- "+ this.data);

    // console.log("Topbar Enterd with 2:- "+this.service.returrnAns());
    // const user = this.loginService.getData();
    // this.user_type = user[2];
    // this.user_id = user[0];
    // console.log(this.user_type);

    /////////////////  Getting Local Storage Emp Data//////////////////
    const localData = this.loginService.loadData();
    console.log("Top Bar LocalStorage : "+localData);
    const myData = JSON.parse(localData);
    this.user_id = myData.eid;
    this.user_type = myData.emp_access;
    console.log(this.user_type+" Inside TopBar");

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = (<NavigationEnd>event).url;
        console.log("this url is", this.currentRoute);
        //rimbusrsment
        if (this.currentRoute == "/initiaterem" || this.currentRoute == "/faq" || this.currentRoute == "/reimbusmentapprove" || this.currentRoute == "/reimbusmentreqdetails") {
          this.data = "rmb"
        }
        //emplloyee
        if (this.currentRoute == "/empDetailview" || this.currentRoute == "/modifypersonal" || this.currentRoute == "/modifyprofessional" || this.currentRoute == "/searchmodify" || this.currentRoute == "/empProfessional" || this.currentRoute == "/emppersonal") {
          this.data = "emp"
        }
        //apraisal
        if (this.currentRoute == "/addappraisal" || this.currentRoute == "/appraisalcomponent" || this.currentRoute == "/doappraisal" || this.currentRoute == "/rejapr" || this.currentRoute == "/viewapldata" || this.currentRoute == "/viewaprl") {
          this.data = "apr"
        }
        //common code
        if (this.currentRoute == "/cocd" || this.currentRoute == "/modifycocd" || this.currentRoute == "/viewcocd" || this.currentRoute == "/deletecocd" || this.currentRoute == "/faq") {
          this.data = "cocd"
        }
        // mark
        if (this.currentRoute == "/mrk" || this.currentRoute == "/searchMrk" || this.currentRoute == "/recall") {
          this.data = "mrk"
        }
        // holiday
        if (this.currentRoute == "/addHolidays" || this.currentRoute == "/modifyLeave" || this.currentRoute == "/removeLeave" || this.currentRoute == "/ListLeave" || this.currentRoute == "/configLeave" || this.currentRoute == "/viewHolidays") {
          this.data = "hol"
        }
        //report
        if (this.currentRoute == "/ReportChooseComponent" || this.currentRoute == "/Reportcompchoose" || this.currentRoute == "/reportcomleavebal" || this.currentRoute == "/reportdetails" || this.currentRoute == "/reportleavedetails" || this.currentRoute == "/reportinv") {
          this.data = "rpt"
        }
        // birthaday
        if (this.currentRoute == "/message" || this.currentRoute == "/inbox" || this.currentRoute == "/sent" || this.currentRoute == "/composeMessage") {
          this.data = "brd"
        }
        // Travel
        if (this.currentRoute == "/travel" || this.currentRoute == '/modTvlReq' || this.currentRoute == "/approvereq" || this.currentRoute == "/canceltvldet" || this.currentRoute == "/canceltvlque" || this.currentRoute == "/travelfaq" || this.currentRoute == "/viewtvl") {
          this.data = "tvl"
        }
        // app renovated 
        if (this.currentRoute == "/cteApp" || this.currentRoute == "/appDataNot" || this.currentRoute == "/doApp" || this.currentRoute == "/modapp") {
          this.data = "arn"
        }
        //project
        if (this.currentRoute == "/childproject" || this.currentRoute == "/faq" || this.currentRoute == "/ProjectDoc" || this.currentRoute == "/CustomerModification" || this.currentRoute == "/CustomerView" || this.currentRoute == "/Customercreation" || this.currentRoute == "/ProjDealloc" || this.currentRoute == "/ProjectAllocation" || this.currentRoute == "/ProjectDetial") {
          this.data = "pjt"
        }

        //invoice
        if (this.currentRoute == "/chooseinvoice" || this.currentRoute == "/generateinrreport" || this.currentRoute == "/generateusdreport" || this.currentRoute == "/invoiceduelist" || this.currentRoute == "/invoiceduetoday" || this.currentRoute == "/invoicefp" || this.currentRoute == "/invoicepay" || this.currentRoute == "/invoiceraise" || this.currentRoute == "/invoicegenarate" || this.currentRoute == "/reportinv") {
          this.data = "inv"
        }

        //request
        if (this.currentRoute == "/applyLev" || this.currentRoute == "/approveLev" || this.currentRoute == "/levBal" || this.currentRoute == "/levSum" || this.currentRoute == "/markLev" || this.currentRoute == "/unmarkLev" || this.currentRoute == "/viewHol" || this.currentRoute == "/viewLev" || this.currentRoute == "/viewLevCancel") {
          this.data = "req"
        }

        //cms


        if (this.currentRoute == "/cmsUpload" || this.currentRoute=="/viewDocs"|| this.currentRoute=="/searchEmp"||this.currentRoute=="/searchEmpAppRej"||this.currentRoute=="/docAppRej" || this.currentRoute == "/viewPen" || this.currentRoute == "/rejView" || this.currentRoute == "/faq"){
          this.data = "upld"
        }
        if (this.currentRoute == "/magzineUpld" || this.currentRoute == "/viewMagz" || this.currentRoute == "/faq") {
          this.data = "Magz"
        }
        if (this.currentRoute == "/policyupld" || this.currentRoute == "/viewPolcy" || this.currentRoute == "/faq") {
          this.data = "Polcy"
        }


        // /Asset
        if (this.currentRoute == "/ItAssetDetails" || this.currentRoute == "/ModifyItAssetDetails" || this.currentRoute == "/ViewItAssetDetails" || this.currentRoute == "/ViewItAssetDetail" || this.currentRoute == "/faq") {
          this.data = "ast"
        }

        if (this.currentRoute == "/ITAssetAllocation" || this.currentRoute == "/ModifyItAllocationDetails" || this.currentRoute == "/ViewItAllocationDetails" || this.currentRoute == "/ViewItAllocationDetail" || this.currentRoute == "/faq") {
          this.data = "allast"
        }

        if (this.currentRoute == "/AddNonItAssetDetails" || this.currentRoute == "/ModifyNonItAssetDetails" || this.currentRoute == "/ViewNonItAssetDetails" || this.currentRoute == "/ViewNonItAssetDetail" || this.currentRoute == "/faq") {
          this.data = "nonast"
        }
      }
    })

    // the below code will should here only other wise your page will not get redirect

    this.data = this.service.returrnAns();



  }
  currentRoute: any; // dont delte thid it will here only


  getUserType() {
    const user = this.loginService.getData();
    this.user_type = user[2]
    console.log(this.user_type);

  }

  fetchaddProjectdetails() {

    const params = new HttpParams().set('user_id', this.user_id.toString())


    this.http.get('http://localhost:4000/projectdetails/fetchProjectAddDetails', { params })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.prjectservice.setAddProjectdetails(response.deAddProjDet)
          this.router.navigate(['/ProjectDetial'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }

  fetchaddPjtAlldetails() {
    const params = new HttpParams().set('user_id', this.user_id.toString())


    this.http.get('http://localhost:4000/projectdetails/fetchaddPjtAlldetails', { params })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.prjectservice.setfetchaddPjtAlldetails(response.fetchaddPjtAlldetails)
          this.router.navigate(['/ProjectAllocation'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }
  fetchaddPjtDeAlldetails() {
    const params = new HttpParams().set('user_type', this.user_type.toString())


    this.http.get('http://localhost:4000/projectdetails/fetchaddPjtDeAlldetails', { params })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.prjectservice.setFetchaddPjtDeAlldetails(response.fetchaddPjtDeAlldetails)
          this.router.navigate(['/ProjDealloc'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }


  addProfile() {
    const params = new HttpParams().set('user_id', this.user_id.toString())

    this.http.get('http://localhost:4000/employeeDetails/employeeDetails', { params })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.loginService.cocd = response.cocd
          this.router.navigate(['/empProfessional'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }

  faq(value: any) {
    this.prjectservice.setFaq(value);
    this.reimbusmentservice.setFaq(value);
    this.trvelService.setFaq(value);
    this.cocdService.setFaq(value);
    this.assetService.setFaq(value);
    this.cmsService.setFaq(value);
    this.router.navigate(['/faq']);
  }

  fetchaddProjectDoc() {
    this.http.get('http://localhost:4000/projectdetails/fecthProjectDoc',)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.prjectservice.projectId = response.projectId
          this.router.navigate(['/ProjectDoc'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }

  aproverTvlreq() {
    const params = new HttpParams().set('user_id', this.user_id.toString()).
      set('user_type', this.user_type.toString())


    this.http.get('http://localhost:4000/travel/aproverTvlreq', { params })
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.trvelService.setTravelApprovalView(response.approvalReqView)
          this.router.navigate(['/viewtvl'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }

  fetchaddRemDeAlldetails() {
    const params = new HttpParams().set('user_id', this.user_id.toString()).set('user_type', this.user_type.toString());

    this.http.get('http://localhost:4000/reimbursement/initiateRem', { params })
      .subscribe(
        (response: any) => {
          console.log(response.fetchaddRemDeAlldetails);
          this.reimbusmentservice.setFetchaddRemDeAlldetails(response.fetchaddRemDeAlldetails);
          this.router.navigate(['/initiaterem']);
        },
        error => {
          console.error(error);
          alert('Error');
        }
      );
  }

  modifyTravelReqView() {
    const params = new HttpParams().set('user_id', this.user_id.toString()).set('user_type', this.user_type.toString());

    this.http.get('http://localhost:4000/travel/modifytravelDetailsQueue', { params })
      .subscribe(
        (response: any) => {

          this.trvelService.setTravelApprovalView(response.data.pendingStatusData)
          this.router.navigate(['/modTvlReq'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }

  cancelTravelReqView(){
    const params = new HttpParams().set('user_id', this.user_id.toString()).set('user_type', this.user_type.toString());
  
    this.http.get('http://localhost:4000/travel/cancelTravelReqView', { params })
      .subscribe(
        (response: any) => {
         
          this.trvelService.setcancelTravelReqView(response.cancelTravelReqView)
          this.router.navigate(['/canceltvldet'])
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }
}