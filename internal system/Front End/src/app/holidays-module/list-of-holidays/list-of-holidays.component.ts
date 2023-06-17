import { Component } from '@angular/core';
@Component({
  selector: 'app-list-of-holidays',
  templateUrl: './list-of-holidays.component.html',
  styleUrls: ['./list-of-holidays.component.css']
})
export class ListOfHolidaysComponent {

  holidays = [
    { id: 1, type: 'Public', date: '2023-01-01', description: 'New Year', year: 2023 },
    { id: 2, type: 'Public', date: '2023-01-26', description: 'Republic Day', year: 2023 },
    { id: 3, type: 'Optional', date: '2023-02-19', description: 'Shivaji Jayanti', year: 2023 },
    { id: 4, type: 'Public', date: '2023-03-10', description: 'Holi', year: 2023 },
    { id: 5, type: 'Public', date: '2023-04-14', description: 'Dr. Babasaheb Ambedkar Jayanti', year: 2023 },
    { id: 6, type: 'Optional', date: '2023-05-09', description: 'Guru Tegh Bahadur Martyrdom Day', year: 2023 },
    { id: 7, type: 'Public', date: '2023-08-15', description: 'Independence Day', year: 2023 },
    { id: 8, type: 'Public', date: '2023-10-02', description: 'Gandhi Jayanti', year: 2023 },
    { id: 9, type: 'Public', date: '2023-10-19', description: 'Dussehra', year: 2023 },
    { id: 10, type: 'Public', date: '2023-11-04', description: 'Diwali', year: 2023 },
    { id: 11, type: 'Optional', date: '2023-11-24', description: 'Guru Tegh Bahadur Martyrdom Day', year: 2023 },
    { id: 12, type: 'Public', date: '2023-12-25', description: 'Christmas', year: 2023 }
  ];


  itemsPerPage = 10;
currentPage = 1;
totalItems = this.holidays.length;

   deleteHoliday(id: number) {
    this.holidays = this.holidays.filter(holidays => holidays.id !== id);
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
