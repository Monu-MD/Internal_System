import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { NavserviceService } from 'src/app/services/navservice.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  condition: boolean = true; // Initial value
  user_id: any;
  user_type: any;
  userEnable = false;
  
  // Method to enable or disable based on a specific condition
  toggleEnableDisable() {
    this.condition = !this.condition;
  }

  constructor(private router: Router,
    private service: NavserviceService,
    private loginservice: LoginServiceService,
    private travleservice: TravelServiceService

  ) {

    // const user = this.loginservice.getData()
    // this.user_id = user[0];
    // this.user_type = user[2];
    // console.log(this.user_type, "Insidebar");

    ////////////////////////////////////
    const localData = this.loginservice.loadData();
    const myData = JSON.parse(localData);
    console.log("Side Bar LocalStorage: " + localData);
    this.user_id = myData.eid;
    this.user_type = myData.emp_access;
    console.log(this.user_type, "Inside side bar");




    if (this.user_type == 'A1') {
      console.log("Adm Enterd");
      this.userEnable = true;
    } else {
      console.log("user enterd", this.userEnable);
      this.userEnable = false;

    }
  }

  getEnable() {
    console.log(this.userEnable);
    return this.userEnable
  }

  getID(item: string) {
    console.log("Side Bar got: " + item);
    this.service.get(item)

    if (item == 'dsh') {
      if (this.user_type == 'A1') {
        this.router.navigate(['admindashboard'])
      } else {
        this.router.navigate(['dashboard'])
      }
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
      if (this.user_type == 'A1' || this.user_type == 'F1') {
        this.router.navigate(['reimbusmentreqdetails'])
      } else {
        this.router.navigate(['reimbusmentapprove'])
      }

    }
    if (item == 'emp') {
      if (this.user_type == 'A1') {
        this.router.navigate(['searchmodify'])
      } else {
        this.loginservice.setViewAproval('viewData')
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
      this.router.navigate(['viewHolidays'])
    }
    if (item == 'inv') {
      this.router.navigate(['chooseinvoice'])
    }
    if (item == 'mrk') {
      this.router.navigate(['searchMrk'])
    }

    if (item == 'rpt') {
      if (this.user_type == 'A1' || this.user_type == 'F1') {
        this.router.navigate(['reportdetails'])
      } else {
        this.router.navigate(['dashboard'])
      }
    }
    if (item == 'res') {
      this.router.navigate(['changePassword'])
    }
    if (item == 'brd') {
      this.router.navigate(['message'])
    }
    if (item == 'tvl') {
      if (this.user_type=='A1'|| this.user_type=='L1') {
        this.travleservice.fetchProjectId(this.user_id)
      } else {
        this.router.navigate(['travelfaq'])
              }
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
      this.router.navigate(['docs'])
    }
  }
}
