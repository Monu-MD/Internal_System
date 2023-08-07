import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { CocdService } from 'src/app/services/cocd.service';

@Component({
  selector: 'app-common-code-details-modify',
  templateUrl: './common-code-details-modify.component.html',
  styleUrls: ['./common-code-details-modify.component.css']
})
export class CommonCodeDetailsModifyComponent {
  code_id: any;
  comm_code_id: any;
  comm_code_desc:any;

  constructor(private service: CocdService) {

    var cocd = this.service.getRowData();
console.log("get data -->",cocd);

this.code_id=cocd[0].code_id;
this.comm_code_id=cocd[0].comm_code_id;
this.comm_code_desc=cocd[0].comm_code_desc;
   }

  modifyCommonCodeDetailsForm = new FormGroup<any>({
    code_id: new FormControl('', [Validators.required]),
    comm_code_id: new FormControl('', [Validators.required]),
    comm_code_desc: new FormControl('', [Validators.required])
  });

  onSubmit(item: any) {
    this.service.updateData(item);
    console.log(item);
  }

  get(){
    return this.onSubmit
  }
}
