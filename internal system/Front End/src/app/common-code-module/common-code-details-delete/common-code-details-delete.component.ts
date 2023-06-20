import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { CocdService } from 'src/app/services/cocd.service';

@Component({
  selector: 'app-common-code-details-delete',
  templateUrl: './common-code-details-delete.component.html',
  styleUrls: ['./common-code-details-delete.component.css']
})

export class CommonCodeDetailsDeleteComponent {
  
  constructor(private service: CocdService) { }

    deleteCommonCodeDetailsForm=new FormGroup<any>({
    code_id: new FormControl('', [Validators.required]),
    comm_code_id:new FormControl('', [Validators.required]),
    comm_code_desc:new FormControl('', [Validators.required])
  })

onSubmit(item:any){
  this.service.deleteData(item) // calling post method 
  console.log(item);
}
  get(){
    return this.onSubmit
  }
}
