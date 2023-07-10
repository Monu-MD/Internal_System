import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-modify-it-asset-details',
  templateUrl: './modify-it-asset-details.component.html',
  styleUrls: ['./modify-it-asset-details.component.css']
})
export class ModifyItAssetDetailsComponent {
  constructor(private http: HttpClient,
    ) { }



  modifyItAssetDetailsForm=new FormGroup<any>({
    asset_id: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    make:new FormControl('', [Validators.required]),
    serial_no:new FormControl('', [Validators.required]),
    model:new FormControl('', [Validators.required]),
    host_name:new FormControl('', [Validators.required]),
    ip_addr:new FormControl('', [Validators.required]),
    os:new FormControl('', [Validators.required]),
    os_type:new FormControl('', [Validators.required]),
    software:new FormControl('', [Validators.required]),
    ram:new FormControl('', [Validators.required]),
    processor:new FormControl('', [Validators.required]),
    hard_disk:new FormControl('', [Validators.required]),
    accessories:new FormControl('', [Validators.required]),
    window_product_key:new FormControl('', [Validators.required])
 })


  updateData(item: any) {
    const updateData = {
      asset_id:item.asset_id,
      product: item.product,
      make: item. make,
      serial_no: item.serial_no,
      model: item.model,
      host_name: item.host_name,
      ip_addr: item.ip_addr,
      os: item.os,
      os_type: item.os_type,
      software: item.software,
      ram: item.ram,
      processor: item.processor,
     hard_disk: item.hard_disk,
      accessories: item.accessories,
      window_product_key:item.window_product_key
     
    };

   
   
  this.http.post('http://localhost:4000/assetDetails/assetmoddet', updateData)
  .subscribe(
    (response: any) => {

   console.log("enterd");
   
      console.log('Data updated successfully:', response);
     

    },
    (error: any) => {
      console.error('Error:', error);
    }
  );
}

fetchData(assetId : any) {
  const params = new HttpParams().set('assetId ',assetId .toString())

  this.http.get('http://localhost:4000/assetDetails/assetViewDetail', { params })
    .subscribe(
      response => {
        console.log(response);
        this.getData(response)
     
      },
      error => {
        console.error(error);
        alert('Error uploading profile picture.');
      }
    );
}

asset_id: any;
product: any;
make: any;
serial_no: any;
model: any;
host_name: any;
ip_addr:any;
os: any;
os_type: any;
software: any;
ram: any;
processor: any;
hard_disk: any;
accessories: any;
window_product_key:any;



getData(response: any) {
  this.asset_id= response.asset_id
  this.product = response.product
  this.make = response.make
  this.serial_no = response.serial_no
  this.model = response.model
  this.host_name = response.host_name
  this.ip_addr = response.ip_addr
  this.os = response.os
  this.os_type = response.os_type
  this.software = response.software
  this.ram = response.ram
  this.processor= response.processor
  this.hard_disk= response.hard_disk
  this.accessories = response.accessories
  this.window_product_key = response.window_product_key 
}

modifybtn = false;


onSubmit(item:any){
  console.log(item);
  this.updateData(item);
}

 get() {
   return this.onSubmit;
 }
}
