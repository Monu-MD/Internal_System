import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { CocdService } from 'src/app/services/cocd.service';

@Component({
  selector: 'app-common-code-details',
  templateUrl: './common-code-details.component.html',
  styleUrls: ['./common-code-details.component.css']
})
export class CommonCodeDetailsComponent {

  constructor(private service:CocdService) { }

    commonCodeDetailsForm=new FormGroup<any>({
      code_id: new FormControl('', [Validators.required]),
      comm_code_id:new FormControl('', [Validators.required]),
      comm_code_desc:new FormControl('', [Validators.required])
  })

  onSubmit(item:any){
    console.log(item);
    this.service.postData(item) // calling post method 
  }

  get(){
    return this.onSubmit
  }
  
}
