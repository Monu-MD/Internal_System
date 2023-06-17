import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent {


  addForm=new FormGroup<any>({
    action: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
 

  })

 onSubmit(item:any){
   console.log(item);
 
 }

 get() {
   return this.onSubmit;
 }
}
