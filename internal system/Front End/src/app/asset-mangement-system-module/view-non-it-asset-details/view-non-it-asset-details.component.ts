import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-view-non-it-asset-details',
  templateUrl: './view-non-it-asset-details.component.html',
  styleUrls: ['./view-non-it-asset-details.component.css']
})
export class ViewNonItAssetDetailsComponent {

  
  viewNonItAssetDetailsForm=new FormGroup<any>({
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
