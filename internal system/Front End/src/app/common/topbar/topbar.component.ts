import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { NavserviceService } from 'src/app/services/navservice.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  data: any;
  user_type: any;
 

  redirect() {

  }
  constructor(private service: NavserviceService,
    private router: Router, private loginService: LoginServiceService) {
    
    /// redirect data or id ///
      this.data = this.service.returrnAns;
    console.log("Topbar Enterd");

    console.log(this.service.returrnAns());
    const user=this.loginService.getData();
    this.user_type=user[2];
    console.log(this.user_type);
    

    //// to enable and disable //
    




    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = (<NavigationEnd>event).url;
        console.log("this url is", this.currentRoute);
        //rimbusrsment
        if (this.currentRoute == "/initiaterem" || this.currentRoute == "/reimbusmentapprove" || this.currentRoute == "/reimbusmentreqdetails") {
          this.data = "rmb"
        }
        //emplloyee
        if (this.currentRoute == "/bankdetails"||this.currentRoute=="/empDetailview" || this.currentRoute == "/modifypersonal" || this.currentRoute == "/modifyprofessional" || this.currentRoute == "/searchmodify" || this.currentRoute == "/empProfessional" || this.currentRoute == "/emppersonal") {
          this.data = "emp"
        }
        //apraisal
        if (this.currentRoute == "/addappraisal" || this.currentRoute == "/appraisalcomponent" || this.currentRoute == "/doappraisal" || this.currentRoute == "/rejapr" || this.currentRoute == "/viewapldata" || this.currentRoute == "/viewaprl") {
          this.data = "apr"
        }
        //common code
        if (this.currentRoute == "/cocd" || this.currentRoute == "/modifycocd" || this.currentRoute == "/viewcocd" || this.currentRoute == "/deletecocd") {
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
        if (this.currentRoute == "/travel" || this.currentRoute == "/approvereq" || this.currentRoute == "/canceltvldet" || this.currentRoute == "/canceltvlque" || this.currentRoute == "/travelfaq" || this.currentRoute == "/viewtvl") {
          this.data = "tvl"
        }
        // app renovated 
        if (this.currentRoute == "/cteApp" || this.currentRoute == "/appDataNot" || this.currentRoute == "/doApp" || this.currentRoute == "/modapp") {
          this.data = "arn"
        }
        //project
        if (this.currentRoute == "/childproject" || this.currentRoute == "/CustomerModView" || this.currentRoute == "/CustomerModification" || this.currentRoute == "/CustomerView" || this.currentRoute == "/Customercreation" || this.currentRoute == "/ProjDealloc" || this.currentRoute == "/ProjectAllocation" || this.currentRoute == "/ProjectDetial") {
          this.data = "pjt"
        }

        //invoice
        if (this.currentRoute == "/chooseinvoice" || this.currentRoute == "/generateinrreport" || this.currentRoute == "/generateusdreport" || this.currentRoute == "/invoiceduelist" || this.currentRoute == "/invoiceduetoday" || this.currentRoute == "/invoicefp" || this.currentRoute == "/invoicepay" || this.currentRoute == "/invoiceraise" || this.currentRoute == "/invoicegenarate" || this.currentRoute == "/reportinv") {
          this.data = "inv"
        }

        //request
        if (this.currentRoute == "/applyLev" || this.currentRoute == "/approveLev" || this.currentRoute == "/levBal" || this.currentRoute == "/levSum" || this.currentRoute == "/markLev" || this.currentRoute == "/unmarkLev" || this.currentRoute == "/viewHol" || this.currentRoute == "/viewLev") {
          this.data = "req"
        }

        //cms
        if (this.currentRoute == "/cmsUpload" || this.currentRoute == "/magzineUpld" || this.currentRoute == "/policyupld") {
          this.data = "cms"
        }

        // /Asset
        if (this.currentRoute == "/ItAssetDetails" || this.currentRoute == "/ModifyItAssetDetails" || this.currentRoute == "/ViewItAssetDetails") {
          this.data = "ast"
        }

        if (this.currentRoute == "/ITAssetAllocation" || this.currentRoute == "/ModifyItAllocationDetails" || this.currentRoute == "/ViewItAllocationDetails") {
          this.data = "allast"
        }

        if (this.currentRoute == "/AddNonItAssetDetails" || this.currentRoute == "/ModifyNonItAssetDetails" || this.currentRoute == "/ViewNonItAssetDetails") {
          this.data = "nonast"
        }
      }
    })

    // the below code will should here only other wise your page will not get redirect

    this.data = this.service.returrnAns();



  }
  currentRoute: any; // dont delte thid it will here only


  getUserType() {
    const user=  this.loginService.getData();
    this.user_type=user[2]
    console.log(this.user_type);
    
  }



}
