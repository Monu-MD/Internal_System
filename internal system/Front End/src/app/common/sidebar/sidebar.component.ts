import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { NavserviceService } from 'src/app/services/navservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  condition: boolean = true; // Initial value
 
  // Method to enable or disable based on a specific condition
  toggleEnableDisable() {
    this.condition = !this.condition; // Toggles the value of condition
  }

  user_type: any;

  userEnable = false;

  constructor(private router: Router,
    private service: NavserviceService,
    private loginservice: LoginServiceService

  ) {
    console.log("top enterd");

    const user = this.loginservice.getData()
    this.user_type = user[2];
    console.log(this.user_type,"innsidebar");

    if (this.user_type == 'A1') {
      console.log("ifEnterd");

      this.userEnable = true;
    } else {
      console.log("else enterd", this.userEnable);

      this.userEnable = false;

    }
  }

  getEnable(){
    console.log(this.userEnable);
    
    return this.userEnable
  }

  getID(item: string) {
    console.log(item);
    this.service.get(item)

    if (item == 'dsh') {

      this.router.navigate(['dashboard'])
    }

    if (item == 'apr') {
      this.router.navigate(['addappraisal'])
    }
    if (item == 'brd') {
      this.router.navigate(['message'])
    }
    if (item == 'cms') {
      this.router.navigate(['cmsuploadadmin'])
    }
    if (item == 'rmb') {
      this.router.navigate(['initiaterem'])
    }
    if (item == 'emp') {
      if (this.user_type=='A1') {
        this.router.navigate(['searchmodify'])
      } else {
        
        this.router.navigate(['empDetailview'])
      }
    }
    if (item == 'cocd') {
      this.router.navigate(['cocd'])
    }

    if (item == 'ast') {
      this.router.navigate(['AssetDetails'])
    }

    if (item == 'hol') {
      this.router.navigate(['addHolidays'])
    }
    if (item == 'inv') {
      this.router.navigate(['chooseinvoice'])
    }
    if (item == 'mrk') {
      this.router.navigate(['searchMrk'])
    }

    if (item == 'rpt') {
      this.router.navigate(['ReportChooseComponent'])
    }
    if (item == 'res') {
      this.router.navigate(['changePassword'])
    }
    if (item == 'brd') {
      this.router.navigate(['message'])
    }
    if (item == 'tvl') {
      this.router.navigate(['travel'])
    }
    if (item == 'arn') {
      this.router.navigate(['cteApp'])
    }
    if (item == 'pjt') {
      this.router.navigate(['childproject'])
    }

    if (item == 'req') {
      this.router.navigate(['applyLev'])
    }
    if (item == 'cms') {
      this.router.navigate(['cmsUpload'])
    }
  }
}
