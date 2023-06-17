import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-common-code-details',
  templateUrl: './common-code-details.component.html',
  styleUrls: ['./common-code-details.component.css']
})
export class CommonCodeDetailsComponent {

  commonCodeDetailsForm=new FormGroup<any>({
    codeId: new FormControl('', [Validators.required]),
    commonCodeId:new FormControl('', [Validators.required]),
    description:new FormControl('', [Validators.required])


  })
 onSubmit(item:any){
    console.log(item);
  
  }

  get(){
    return this.onSubmit
  }
}
