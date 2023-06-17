import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-view-it-allocation-details',
  templateUrl: './view-it-allocation-details.component.html',
  styleUrls: ['./view-it-allocation-details.component.css']
})
export class ViewItAllocationDetailsComponent {

  viewItAssetAllocationForm=new FormGroup<any>({
    assetId: new FormControl('', [Validators.required]),
    employeeId:new FormControl('',[Validators.required]),
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
