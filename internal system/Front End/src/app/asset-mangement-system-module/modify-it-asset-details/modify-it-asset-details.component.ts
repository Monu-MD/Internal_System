import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssetServiceService } from 'src/app/services/asset-service.service';
@Component({
  selector: 'app-modify-it-asset-details',
  templateUrl: './modify-it-asset-details.component.html',
  styleUrls: ['./modify-it-asset-details.component.css']
})
export class ModifyItAssetDetailsComponent {
  
  searchAssetId:any;
  assetData: any;
  asset_id:any
  product:any
  make:any
  serial_no:any
  model:any
  host_name:any
  ip_addr:any
  os:any
  os_type:any
  software:any
  ram:any
  processor:any
  hard_disk:any
  accessories:any
  window_product_key:any
 
  constructor(private http: HttpClient,private service : AssetServiceService ) {
   

    var asset = this.service.getRowData();

    console.log(asset+" Asset detail from getData");
    
    this.asset_id=asset[0].asset_id;
    this.product=asset[0].product;
    this.make=asset[0].make;
    this.serial_no=asset[0].serial_no;
    this.model=asset[0].model;
    this.host_name=asset[0].host_name;
    this.ip_addr=asset[0].ip_addr;
    this.os=asset[0].os;
    this.os_type=asset[0].os_type;
    this.software=asset[0].software;
    this.ram=asset[0].ram;
    this.processor=asset[0].processor;
    this.hard_disk=asset[0].hard_disk;
    this.accessories=asset[0].accessories;
    this.window_product_key=asset[0].window_product_key;
   

   }


  

    
    modifyblur:boolean=true;
    modifyItAssetDetailsForm=new FormGroup<any>({
    asset_id: new FormControl(''),
    product: new FormControl(''),
    make:new FormControl(''),
    serial_no:new FormControl(''),
    model:new FormControl(''),
    host_name:new FormControl(''),
    ip_addr:new FormControl(''),
    os:new FormControl(''),
    os_type:new FormControl(''),
    software:new FormControl(''),
    ram:new FormControl(''),
    processor:new FormControl(''),
    hard_disk:new FormControl(''),
    accessories:new FormControl(''),
    window_product_key:new FormControl('')


 })

  updateData(item: any) {
    // if (this.modifyblur===false) {
      
      
    // } else {
      
    // }
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



fetchData( selectedAsset: string): void {
  const userinfo = {
    asset_id: selectedAsset
  };

  console.log(userinfo);

  this.http.post('http://localhost:4000/assetDetails/assetmodView', { userinfo })
    .subscribe(
      (response: any) => {
        console.log(response.data);
        this.assetData = response.data;
        this.updateFormFields();
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
}

ngOnInit(): void {
  
}

help(value:any){
  console.log(value);
  console.log("help");
  
  this.modifyItAssetDetailsForm.get('asset_id')?.valueChanges.subscribe((selectedAsset: string | null) => {
    if (selectedAsset !== null) {
      this.modifyblur=false;
      this.fetchData(selectedAsset);
    }
  });
}
updateFormFields(): void {
  this.modifyItAssetDetailsForm.patchValue({   
    product:  this.assetData.product,
    make: this.assetData.make,
    serial_no: this.assetData.serial_no,
    model: this.assetData.availed_Lev,
    host_name: this.assetData.availed_Lev,
    ip_addr: this.assetData.availed_Lev,
    os: this.assetData.availed_Lev,
    os_type: this.assetData.availed_Lev,
    software: this.assetData.availed_Lev,
    ram: this.assetData.availed_Lev,
    processor: this.assetData.availed_Lev,
    hard_disk: this.assetData.availed_Lev,
    accessories: this.assetData.availed_Lev,
    window_product_key: this.assetData.availed_Lev
  });
}


onSubmit(item:any){
  console.log(item);
  this.updateData(item);
}

 get() {
   return this.onSubmit;
 }
}

// fetchData(assetId : any) {
//   const params = new HttpParams().set('assetId ',assetId .toString())

//   this.http.get('http://localhost:4000/assetDetails/assetViewDetail', { params })
//     .subscribe(
//       response => {
//         console.log(response);
//         this.getData(response)
     
//       },
//       error => {
//         console.error(error);
//         alert('Error uploading profile picture.');
//       }
//     );
// }

// asset_id: any;
// product: any;
// make: any;
// serial_no: any;
// model: any;
// host_name: any;
// ip_addr:any;
// os: any;
// os_type: any;
// software: any;
// ram: any;
// processor: any;
// hard_disk: any;
// accessories: any;
// window_product_key:any;



// getData(response: any) {
//   this.asset_id= response.asset_id
//   this.product = response.product
//   this.make = response.make
//   this.serial_no = response.serial_no
//   this.model = response.model
//   this.host_name = response.host_name
//   this.ip_addr = response.ip_addr
//   this.os = response.os
//   this.os_type = response.os_type
//   this.software = response.software
//   this.ram = response.ram
//   this.processor= response.processor
//   this.hard_disk= response.hard_disk
//   this.accessories = response.accessories
//   this.window_product_key = response.window_product_key 
// }

// modifybtn = false;



