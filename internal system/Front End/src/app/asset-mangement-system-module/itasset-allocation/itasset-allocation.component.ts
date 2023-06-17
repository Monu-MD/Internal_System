import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-itasset-allocation',
  templateUrl: './itasset-allocation.component.html',
  styleUrls: ['./itasset-allocation.component.css']
})
export class ITAssetAllocationComponent {

  addItAssetAllocationForm=new FormGroup<any>({
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
