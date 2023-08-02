import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-comp-choose',
  templateUrl: './report-comp-choose.component.html',
  styleUrls: ['./report-comp-choose.component.css']
})
export class ReportCompChooseComponent {


constructor(private http: HttpClient,private router : Router) { }

  employeeId:any;
  register=new FormGroup<any>({
    emp_id: new FormControl('', [Validators.required]),
    module:new FormControl('',[Validators.required])

  })
  
    postData(item: any) {
      const postData = {
        emp_id:item.emp_id,
        module: item.module,   
      };
  
     
    this.http.post('http://localhost:4000/report/getReport', postData)
    .subscribe(
      (response: any) => {
      
        console.log('Data posted successfully:', response);
  
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  

  onSubmit(item:any){
    console.log(item);
    this.postData(item);
  }
  

   get() {
     return this.onSubmit;
   }


}
