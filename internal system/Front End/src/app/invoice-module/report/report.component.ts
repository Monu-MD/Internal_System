import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  constructor(private route:Router){}

  printPage(){
    window.print();
  }

    
 close(){
  this.route.navigate(['chooseinvoice'])
}

  
}
