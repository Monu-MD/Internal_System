import { Component } from '@angular/core';

@Component({
  selector: 'app-view-travel-appr-queue',
  templateUrl: './view-travel-appr-queue.component.html',
  styleUrls: ['./view-travel-appr-queue.component.css']
})
export class ViewTravelApprQueueComponent {

  viewtravel = [
    {  reqid: 'No Record Found', projectid: 'No Record Found', employee: 'No Record Found', from: 'No Record Found',to: 'No Record Found',status: 'No Record Found',action: 'No Record Found' },
  ];

  itemsPerPage = 10;
  currentPage = 1; 
  totalItems = this.viewtravel.length;
  PerPage: number = 100;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];
  onItemsPerPageChange(): void {
    this.currentPage = 1;

  }
}
