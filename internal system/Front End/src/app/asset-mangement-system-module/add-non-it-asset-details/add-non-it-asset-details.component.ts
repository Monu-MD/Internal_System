import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-add-non-it-asset-details',
  templateUrl: './add-non-it-asset-details.component.html',
  styleUrls: ['./add-non-it-asset-details.component.css']
})
export class AddNonItAssetDetailsComponent {
 
  addNonItAssetDetailsForm=new FormGroup<any>({
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
