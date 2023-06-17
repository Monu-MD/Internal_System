import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generateinr-report',
  templateUrl: './generateinr-report.component.html',
  styleUrls: ['./generateinr-report.component.css']
})
export class GenerateinrReportComponent {

 

  constructor(private route:Router){}
  printPage(){
    window.print();
  }

  
 close(){
      this.route.navigate(['chooseinvoice'])
    }

}
