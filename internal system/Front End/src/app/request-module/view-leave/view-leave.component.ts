import { Component } from '@angular/core';

@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent {

  viewLeave = [
    { leaveType:'No Record Found', fromDate:'No Record Found', toDate :'No Record Found', reason:'No Record Found', approver:'No Record Found', noOfDays:'No Record Found', status:'No Record Found', allocatedLeave:'No Record Found', earlierTransactions:'No Record Found'}
  
  ];


itemsPerPage = 10;
currentPage = 1;
totalItems = this.viewLeave.length;

PerPage: number = 100;
itemsPerPageOptions: number[] = [10, 25, 50, 100];
onItemsPerPageChange(): void {
  this.currentPage = 1;
}
}
