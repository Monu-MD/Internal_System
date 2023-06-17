import { Component } from '@angular/core';

@Component({
  selector: 'app-view-common-code',
  templateUrl: './view-common-code.component.html',
  styleUrls: ['./view-common-code.component.css']
})

export class ViewCommonCodeComponent {
  viewCocd = [
    { codeId:'No Record Found',commonCodeId:'No Record Found',commonCodeDescription:'No Record Found' },
    { codeId:'No Record Found',commonCodeId:'No Record Found',commonCodeDescription:'No Record Found' },
    { codeId:'No Record Found',commonCodeId:'No Record Found',commonCodeDescription:'No Record Found' }
  ];


itemsPerPage = 10;
currentPage = 1;
totalItems = this.viewCocd.length;

PerPage: number = 100;
itemsPerPageOptions: number[] = [10, 25, 50, 100];
onItemsPerPageChange(): void {
  this.currentPage = 1;

}
}
