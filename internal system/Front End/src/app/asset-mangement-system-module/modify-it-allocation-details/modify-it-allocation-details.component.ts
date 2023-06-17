import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-modify-it-allocation-details',
  templateUrl: './modify-it-allocation-details.component.html',
  styleUrls: ['./modify-it-allocation-details.component.css']
})
export class ModifyItAllocationDetailsComponent {

  modifyItAssetAllocationForm=new FormGroup<any>({
    assetId: new FormControl('', [Validators.required]),
    employeeId:new FormControl('',[Validators.required]),
    employeeName:new FormControl('', [Validators.required]),
    allocationDate:new FormControl('', [Validators.required]),
    returnDate:new FormControl('', [Validators.required])
 })
 submit(item:any){
    console.log(item);
  
  }

  get(){
    return this.submit
  }
}
