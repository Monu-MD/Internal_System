import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { CocdService } from 'src/app/services/cocd.service';

@Component({
  selector: 'app-common-code-details-modify',
  templateUrl: './common-code-details-modify.component.html',
  styleUrls: ['./common-code-details-modify.component.css']
})
export class CommonCodeDetailsModifyComponent {

  constructor(private serive: CocdService) { }

  modifyCommonCodeDetailsForm = new FormGroup<any>({
    code_id: new FormControl('', [Validators.required]),
    comm_code_id: new FormControl('', [Validators.required]),
    comm_code_desc: new FormControl('', [Validators.required])
  });

  onSubmit(item: any) {
    this.serive.updateData(item);
    console.log(item);
  }

  get(){
    return this.onSubmit
  }
}
