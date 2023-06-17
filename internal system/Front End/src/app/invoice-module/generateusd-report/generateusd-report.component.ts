import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-generateusd-report',
  templateUrl: './generateusd-report.component.html',
  styleUrls: ['./generateusd-report.component.css']
})
export class GenerateusdReportComponent {
  constructor(private route:Router){}
  print(){
    window.print();
  }
  
  close(){
    this.route.navigate(['chooseinvoice'])
  }
}
