import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

interface ListItem {
  emp_id: any
  emp_name: string;
  checked: boolean;
}

@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css']
})
export class ProjectAllocationComponent {
  user_id: any;
  empnames: any;
  home_cur: any;
  manager: any;
  toppingList: any;
  isDropdownOpen = false;
  items: ListItem[] = [];
  notification: any;

  constructor(private projectService: ProjectserviceService,
    private loginservice: LoginServiceService,
    private http: HttpClient
  ) {
    this.user_id = this.loginservice.getData()[0]
    const data = this.projectService.getData()[2];
    const empnameObject = data.empname;
    this.items = Object.values(empnameObject);
    console.log(this.items[0]);


    this.home_cur = data.home_cur;
    this.manager = data.manager;
  }

  Project_Allocation = new FormGroup<any>({
    projectid: new FormControl(''),
    projectReportingManager: new FormControl(''),
    projectAllocation: new FormControl(''),
    allocationStartDate: new FormControl(''),
    allocationEndDate: new FormControl(''),
    employeeLocationType: new FormControl(''),
    employeeBillable: new FormControl(''),
    noofworkingdays: new FormControl(''),
    noofworkingmonths: new FormControl(''),
    firstmonthdays: new FormControl(''),
    lastmonthdays: new FormControl(''),
    firstnoofhdays: new FormControl(''),
    lastnoofhdays: new FormControl(''),
    convRate: new FormControl(''),
   
  });



  get selectedItems(): ListItem[] {
    return this.items.filter(item => item.checked);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectedIEmployees: ListItem[] = [];

  toggleItem(item: ListItem) {
    item.checked = !item.checked;

    if (item.checked) {
      this.selectedIEmployees.push(item.emp_id);
    } else {
      const index = this.selectedIEmployees.findIndex(selectedItem => selectedItem.emp_id === item.emp_id);
      if (index > -1) {
        this.selectedIEmployees.splice(index, 1);
      }
    }

    console.log(item.checked, item, "check4");
  }
  projectAllocation(item: any) {

    console.log(item);
    console.log(this.selectedIEmployees);

    const allItems = {
      user_id: this.user_id,
      item: item,
      empselected: this.selectedIEmployees
    }
    this.projectAllocationData(allItems)
  }

  projectAllocationData(item: any) {

    this.http.post('http://localhost:4000/projectdetails/projectAllocation', item)
      .subscribe(
        (response: any) => {
          console.log(response);
          
          this.notification = response.notification;
        },
        error => {
          console.error(error);
          alert('Error ');
        }
      );
  }
}







