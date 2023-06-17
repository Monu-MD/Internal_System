import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-modify-it-asset-details',
  templateUrl: './modify-it-asset-details.component.html',
  styleUrls: ['./modify-it-asset-details.component.css']
})
export class ModifyItAssetDetailsComponent {
  modifyItAssetDetailsForm=new FormGroup<any>({
    assetId: new FormControl('', [Validators.required]),
    product:new FormControl('', [Validators.required]),
    make:new FormControl('', [Validators.required]),
    serialNo:new FormControl('', [Validators.required]),
    modle:new FormControl('', [Validators.required]),
    hostName:new FormControl('', [Validators.required]),
    ipAddress:new FormControl('', [Validators.required]),
    os:new FormControl('', [Validators.required]),
    osType:new FormControl('', [Validators.required]),
    software:new FormControl('', [Validators.required]),
    ram:new FormControl('', [Validators.required]),
    processor:new FormControl('', [Validators.required]),
    hardDisk:new FormControl('', [Validators.required]),
    accessories:new FormControl('', [Validators.required]),
    windowsProductKey:new FormControl('', [Validators.required])
    

  })
 submit(item:any){
    console.log(item);
  
  }

  get(){
    return this.submit
  }
}
