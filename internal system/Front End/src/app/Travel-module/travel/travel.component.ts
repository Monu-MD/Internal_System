import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent {

  travelid=new FormGroup<any>({

    projectId: new FormControl(''),
    refundAmount: new FormControl(''),
    payExtraAmount: new FormControl(''),
    travelDate: new FormControl(''),
    tentativeReturnDate: new FormControl(''),
    fromLocation: new FormControl(''),
    toLocation: new FormControl(''),
    remarks: new FormControl(''),
    toBeApprovedby : new FormControl('')
    
  })

  travel(item:any){
    console.log(item);
  
  }
}
