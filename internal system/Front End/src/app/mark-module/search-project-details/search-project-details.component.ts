import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-project-details',
  templateUrl: './search-project-details.component.html',
  styleUrls: ['./search-project-details.component.css']
})
export class SearchProjectDetailsComponent {

  constructor(private router:Router){};
  searchForm=new FormGroup<any>({
    projectId: new FormControl('', [Validators.required])

 

  })

 onSubmit(item:any){
   console.log(item);
 
 }
 route(){
  this.router.navigateByUrl('/mrk')
 }
 get() {
   return this.onSubmit;
 }
}
