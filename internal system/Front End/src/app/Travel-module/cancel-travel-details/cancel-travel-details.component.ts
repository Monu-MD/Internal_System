import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cancel-travel-details',
  templateUrl: './cancel-travel-details.component.html',
  styleUrls: ['./cancel-travel-details.component.css']
})
export class CancelTravelDetailsComponent {

  appRejectedreq = new FormGroup<any>({

    projectId: new FormControl(''),
    employeename: new FormControl(''),
    travelDate: new FormControl(''),
    tentativeReturnDate: new FormControl(''),
    fromLocation: new FormControl(''),
    toLocation: new FormControl(''),
    pnrNumber: new FormControl(''),
    ticketNumber: new FormControl(''),
    approverRemarks: new FormControl(''),
    Approvername: new FormControl(''),
    bookedTicketFare: new FormControl(''),
    remarks: new FormControl(''),
    financeRemarks: new FormControl('')

  })

  appreject(item: any) {
    console.log(item);

  }

}
