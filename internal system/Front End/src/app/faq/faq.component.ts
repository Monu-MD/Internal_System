import { Component } from '@angular/core';
import { ProjectserviceService } from '../services/projectservice.service';
import { ReimbursementserviceService } from '../services/reimbursementservice.service';
import { TravelServiceService } from '../services/travel-service.service';
import { CocdService } from '../services/cocd.service';
import { AssetServiceService } from '../services/asset-service.service';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent {

faq: any;

constructor(private prjectservice: ProjectserviceService,private reimbursementservice:ReimbursementserviceService,
  private travelservice:TravelServiceService,private cocdService:CocdService, private AssetService:AssetServiceService
  ,private CmsService:CmsService){
this.faq=this.prjectservice.getData()[4];
this.faq=this.reimbursementservice.getData()[3];
this.faq=this.travelservice.getTrvelData()[4];
this.faq=this.cocdService.getData()[0];
this.faq=this.AssetService.gettData()[0];
this.faq=this.CmsService.cmsGetData()[0];

}


}
