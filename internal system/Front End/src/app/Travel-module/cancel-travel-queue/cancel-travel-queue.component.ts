import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel-travel-queue',
  templateUrl: './cancel-travel-queue.component.html',
  styleUrls: ['./cancel-travel-queue.component.css']
})
export class CancelTravelQueueComponent {


  travelqueue = [
    {  managerapproval: 'No Record Found', approvedmanager: 'No Record Found', pendingfinancemanagerapproval: 'No Record Found', approvedfinancemanagerapproval: 'No Record Found' },
    {  managerapproval: 'No Record Found', approvedmanager: 'No Record Found', pendingfinancemanagerapproval: 'No Record Found', approvedfinancemanagerapproval: 'No Record Found' },
    {  managerapproval: 'No Record Found', approvedmanager: 'No Record Found', pendingfinancemanagerapproval: 'No Record Found', approvedfinancemanagerapproval: 'No Record Found' }
  ];

  itemsPerPage = 10;
  currentPage = 1; 
  totalItems = this.travelqueue.length;
  PerPage: number = 100;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];
  onItemsPerPageChange(): void {
    this.currentPage = 1;

  }
}
