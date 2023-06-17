import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-modify-non-it-asset-details',
  templateUrl: './modify-non-it-asset-details.component.html',
  styleUrls: ['./modify-non-it-asset-details.component.css']
})
export class ModifyNonItAssetDetailsComponent {

  modifyNonItAssetDetailsForm=new FormGroup<any>({
    assetId:new FormControl('', [Validators.required]),
    particulars: new FormControl('', [Validators.required]),
    quantity:new FormControl('', [Validators.required]),
    remarks:new FormControl('', [Validators.required])
    
 })
 submit(item:any){
    console.log(item);
  
  }

  get(){
    return this.submit
  }
}
