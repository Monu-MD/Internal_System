import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureLeavesComponent } from '../holidays-module/configure-leaves/configure-leaves.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ModifyLeavesComponent } from './modify-leaves/modify-leaves.component';
import { RemoveLeavesComponent } from './remove-leaves/remove-leaves.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListOfHolidaysComponent } from './list-of-holidays/list-of-holidays.component';
import { ListOfLeavesComponent } from './viewLeaveData/list-of-leaves.component';

@NgModule({
  declarations: [
    // ConfigureLeavesComponent
  
   // HolidaysComponent
  
   // ModifyLeavesComponent
  
    //RemoveLeavesComponent
  
    // ListOfHolidaysComponent

    
  
    //ListOfLeavesComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],

  exports: [
    // ListOfHolidaysComponent
  ],
  
})
export class HolidaysModuleModule { }
