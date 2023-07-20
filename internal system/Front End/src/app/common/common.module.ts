import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HeadderComponent } from './headder/headder.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
// import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    HeadderComponent,
    FooterComponent,
    TopbarComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommonModule { }
