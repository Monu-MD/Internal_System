import { Component } from '@angular/core';

@Component({
  selector: 'app-invoicedue-today',
  templateUrl: './invoicedue-today.component.html',
  styleUrls: ['./invoicedue-today.component.css']
})
export class InvoicedueTodayComponent {

  currentDetails = [
    { projectId:'No Record Found',projectManager:'No Record Found',deliveryManager:'No Record Found',milestoneName:'No Record Found', percentage:'No Record Found', milestoneAmount:'No Record Found', expectedDate:'No Record Found'},
    { projectId:'No Record Found',projectManager:'No Record Found',deliveryManager:'No Record Found',milestoneName:'No Record Found', percentage:'No Record Found', milestoneAmount:'No Record Found', expectedDate:'No Record Found'},
    { projectId:'No Record Found',projectManager:'No Record Found',deliveryManager:'No Record Found',milestoneName:'No Record Found', percentage:'No Record Found', milestoneAmount:'No Record Found', expectedDate:'No Record Found'}

  ];


itemsPerPage = 10;
currentPage = 1;
totalItems = this.currentDetails.length;

PerPage: number = 100;
itemsPerPageOptions: number[] = [10, 25, 50, 100];
onItemsPerPageChange(): void {
  this.currentPage = 1;

}
totalPages = 45; // Example: total number of pages

constructor() { }

ngOnInit() {
  // Initialize table data or fetch it from an API
}

goToFirstPage() {
  this.currentPage = 1;
  // Load data for the first page
}

goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    // Load data for the previous page
  }
}

goToNextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    // Load data for the next page
  }
}

goToLastPage() {
  this.currentPage = this.totalPages;
  // Load data for the last page
}
}
