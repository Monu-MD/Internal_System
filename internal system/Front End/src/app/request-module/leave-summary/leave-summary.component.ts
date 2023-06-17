import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.css']
})
export class LeaveSummaryComponent {

  leaveSummary = [
    { leaveType:'No Record Found', allocatedLeave:'No Record Found', earlierTransactions:'No Record Found' }
   
  ];


itemsPerPage = 10;
currentPage = 1;
totalItems = this.leaveSummary.length;

PerPage: number = 100;
itemsPerPageOptions: number[] = [10, 25, 50, 100];
onItemsPerPageChange(): void {
  this.currentPage = 1;

}
}
