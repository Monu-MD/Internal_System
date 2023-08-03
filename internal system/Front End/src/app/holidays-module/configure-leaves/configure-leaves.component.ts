import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-configure-leaves',
  templateUrl: './configure-leaves.component.html',
  styleUrls: ['./configure-leaves.component.css']
})
export class ConfigureLeavesComponent {


  leave_type: any;
data:any;
year:any;

  constructor(private http: HttpClient,
    ) { }
 
leaveForm=new FormGroup<any>({

    leave_type: new FormControl('', [Validators.required]),
    allocated_leaves: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
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

  postData(item: any) {
    const postData = {
      leave_type: item.leave_type,
      allocated_leaves: item.allocated_leaves,
      description: item.description,
      year: item.year
    };

  this.http.post('http://localhost:4000/holiday/configureLeaves', postData)
  .subscribe(
    (response: any) => {


      console.log('Data posted successfully:', response);
      // location.reload();

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


