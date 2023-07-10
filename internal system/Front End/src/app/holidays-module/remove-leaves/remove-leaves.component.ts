import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-remove-leaves',
  templateUrl: './remove-leaves.component.html',
  styleUrls: ['./remove-leaves.component.css']
})
export class RemoveLeavesComponent {
  
  constructor(private http: HttpClient) { }

  removeForm=new FormGroup<any>({
    leave_type: new FormControl('', [Validators.required]),
    leave_id: new FormControl('',[Validators.required]),
    year: new FormControl('', [Validators.required]),
    allocated_leaves: new FormControl('', [Validators.required]),
    carry_fwd: new FormControl('', [Validators.required]),

  })


  deleteHoliday(row: any) {
    this.http.get(`http://localhost:4000/holiday/removeLeavePage/${row.leave_id}`).subscribe(
      (response: any) => {
                console.log('Data deleted successfully:', response);
        

                   // Update the form fields with received data
        this.removeForm.patchValue({
          leave_type: response.leave_type,
          leave_id: response.leave_id,
          year: response.year,
          allocated_leaves: response.allocated_leaves,
          carry_fwd: response.carry_fwd
        });

         console.log(this.removeForm)
              },
              (error: any) => {
                console.error('Error:', error);
              }
             
    );
    
    }


 onSubmit(item:any){
   console.log(item);
   this.deleteHoliday(item)
   
 }

 get() {
   return this.onSubmit;
 }
}
