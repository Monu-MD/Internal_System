import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-non-it-asset-details',
  templateUrl: './add-non-it-asset-details.component.html',
  styleUrls: ['./add-non-it-asset-details.component.css']
})
export class AddNonItAssetDetailsComponent {
  constructor(private http: HttpClient) { }

  addNonItAssetDetailsForm=new FormGroup<any>({
    particulr: new FormControl('', [Validators.required]),
    quant:new FormControl('', [Validators.required]),
    rmks:new FormControl('', [Validators.required])

   })
  
    postData(item: any) {
      const postData = {
        particulr:item.particulr,
        quant: item.quant,
        rmks: item. rmks, 
      };
  
    this.http.post('http://localhost:4000/assetDetails/assetnItasset', postData)
    .subscribe(
      (response: any) => {
  
     console.log("enterd");
     
        console.log('Data posted successfully:', response);
       
  
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  
  
  onSubmit(item:any){
    console.log(item);
    this.postData(item);
  }
  
   get() {
     return this.onSubmit;
   }

}
