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
    this.http.delete(`http://localhost:4000/holiday/${row.leave_id}`).subscribe(
      (response: any) => {
                console.log('Data deleted successfully:', response);
        
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
