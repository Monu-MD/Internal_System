import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-comp-choose',
  templateUrl: './report-comp-choose.component.html',
  styleUrls: ['./report-comp-choose.component.css']
})
export class ReportCompChooseComponent {

  constructor(private router:Router){}
  
  employeeId:any;
  register=new FormGroup<any>({
    employeeId: new FormControl('', [Validators.required])

  })
 login(item:any){
    console.log(item);
  
  }

  get(){
    return this.login
  }
}
