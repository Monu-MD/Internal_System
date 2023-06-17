import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proj-dealloc',
  templateUrl: './proj-dealloc.component.html',
  styleUrls: ['./proj-dealloc.component.css']
})
export class ProjDeallocComponent {

  ProjectId=new FormGroup<any>({
    projectid:new FormControl('')
  })
  projectId(id:any){
    console.log(id);
    
  }
}
