import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-common-code-details-modify',
  templateUrl: './common-code-details-modify.component.html',
  styleUrls: ['./common-code-details-modify.component.css']
})
export class CommonCodeDetailsModifyComponent {
  modifyCommonCodeDetailsForm=new FormGroup<any>({
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
