import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-modify-leaves',
  templateUrl: './modify-leaves.component.html',
  styleUrls: ['./modify-leaves.component.css']
})
export class ModifyLeavesComponent {

  constructor(private http: HttpClient) { }

  modifyLeaveForm=new FormGroup<any>({

      leave_type: new FormControl('', [Validators.required]),
      leave_id: new FormControl('', [Validators.required]),
      allocated_leaves: new FormControl('', [Validators.required]),
      carry_fwd: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required])
  
    })

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
