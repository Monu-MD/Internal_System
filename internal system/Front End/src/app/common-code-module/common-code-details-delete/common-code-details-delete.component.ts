import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-common-code-details-delete',
  templateUrl: './common-code-details-delete.component.html',
  styleUrls: ['./common-code-details-delete.component.css']
})
export class CommonCodeDetailsDeleteComponent {

  deleteCommonCodeDetailsForm=new FormGroup<any>({
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
