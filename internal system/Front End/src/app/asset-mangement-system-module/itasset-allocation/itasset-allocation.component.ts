import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itasset-allocation',
  templateUrl: './itasset-allocation.component.html',
  styleUrls: ['./itasset-allocation.component.css']
})
export class ITAssetAllocationComponent {
  constructor(private http: HttpClient) { }

  addItAssetAllocationForm=new FormGroup<any>({
    asset_id: new FormControl('', [Validators.required]),
    empId:new FormControl('',[Validators.required]),
    emp_name:new FormControl('', [Validators.required]),
    allocdate:new FormControl('', [Validators.required]),
    rdate:new FormControl('', [Validators.required])
 })

 
   postData(item: any) {
     const postData = {
      asset_id:item.asset_id,
      empId: item.empId,
      emp_name: item.emp_name,
      allocdate: item.allocdate,
      rdate:item.rdate
     };


 
   this.http.post('http://localhost:4000/assetDetails/assetaddAlloc', postData)
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
