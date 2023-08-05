import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HolidayServicesService } from 'src/app/services/holiday-services.service';
@Component({
  selector: 'app-modify-leaves',
  templateUrl: './modify-leaves.component.html',
  styleUrls: ['./modify-leaves.component.css']
})
export class ModifyLeavesComponent {
  leave_type: any;
  data:any;
  year:any;
  leave_id: any;
  allocated_leaves: any;
  carry_fwd: any;
  rowData: any;

  constructor(private http: HttpClient , private service:HolidayServicesService) { 
 

var holiday = this.service.getRowData();
console.log("get data -->",holiday);
this.rowData=holiday[0],
this.leave_type=holiday[0].leave_type;
this.year=holiday[0].year;
this.leave_id=holiday[0].leave_id;
this.allocated_leaves=holiday[0].allocated_leaves;
this.carry_fwd=holiday[0].carry_fwd;


  }
  modifyLeaveForm=new FormGroup<any>({

      leave_type: new FormControl('', [Validators.required]),
      leave_id: new FormControl('', [Validators.required]),
      allocated_leaves: new FormControl('', [Validators.required]),
      carry_fwd: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required])
  
    })

    ngOnInit() {
      this.fetchData();
    }
    fetchData() {
      this.http.get('http://localhost:4000/holiday/cocd').subscribe(
        (response: any) => {
          console.log(response.data);
          this.leave_type=response.data.leave_type;
          this.year=response.data.year;
    
          
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }

     // Modify Data api 
  updateData(modifyDetails: any) {
    this.http.put(`http://localhost:4000/holiday/modifyLeaves/${modifyDetails.leave_id}`, modifyDetails).subscribe(
      (response: any) => {

        if (response.message == 'Data updated successfully') {
          console.log("Data updated Successfully");
        }
      },

      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }
 onSubmit(item:any){
  this.updateData(item);
   console.log(item);
   
 }

 get() {
   return this.onSubmit;
 }






  

 



}
