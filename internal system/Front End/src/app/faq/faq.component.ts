import { Component } from '@angular/core';
import { ProjectserviceService } from '../services/projectservice.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent {
faq: any;
constructor(private prjectservice: ProjectserviceService){
this.faq=this.prjectservice.getData()[4];
}
}
