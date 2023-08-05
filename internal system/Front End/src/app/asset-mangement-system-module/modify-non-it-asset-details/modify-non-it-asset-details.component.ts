import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import{AssetServiceService} from 'src/app/services/asset-service.service'
@Component({
  selector: 'app-modify-non-it-asset-details',
  templateUrl: './modify-non-it-asset-details.component.html',
  styleUrls: ['./modify-non-it-asset-details.component.css']
})
export class ModifyNonItAssetDetailsComponent {
  asset_id: any;
  particulr:any
  quant:any
  rmks:any
 

 
  constructor(private http: HttpClient,private service : AssetServiceService ) {
   

    var asset = this.service.getRowData();

    console.log(asset+" Asset detail from getData");
    
    this.asset_id=asset[0].asset_id;
    this.particulr=asset[0].particulr;
    this.quant=asset[0].quant;
    this.rmks=asset[0].rmks;
  

   

   }

  modifyNonItAssetDetailsForm=new FormGroup<any>({
    asset_nid:new FormControl('', [Validators.required]),
    particulr: new FormControl('', [Validators.required]),
    quant:new FormControl('', [Validators.required]),
    rmks:new FormControl('', [Validators.required])
    
 })

updateData(item: any) {
  const updateData = {
    asset_nid:item.asset_nid,
    particulr: item.particulr,
    quant: item. quant,
    rmks: item.rmks
   
  };

this.http.post('http://localhost:4000/assetDetails/assetnmoddet', updateData)
.subscribe(
  (response: any) => {

 console.log("enterd");
 
    console.log('Data upadated successfully:', response);
   

  },
  (error: any) => {
    console.error('Error:', error);
  }
);
}

onSubmit(item:any){
console.log(item);
this.updateData(item);
}

get() {
 return this.onSubmit;
}
}
