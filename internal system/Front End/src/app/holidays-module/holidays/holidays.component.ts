import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent {

  constructor(private http: HttpClient,
    ) { }

  addForm=new FormGroup<any>({
    day_type: new FormControl('', [Validators.required]),
    sel_date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
 

  })

  postData(item: any) {
    const postData = {
      day_type: item.day_type,
      sel_date: item.sel_date,
      description: item.description
    };

  this.http.post('http://localhost:4000/holiday/addHolidays', postData)
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
