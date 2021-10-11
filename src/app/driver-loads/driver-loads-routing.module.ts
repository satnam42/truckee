import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverLoadsComponent } from './driver-loads.component';

const routes: Routes = [
  {
    path: '',
    component: DriverLoadsComponent,
    data: {
      title: 'Driver Assigned loads'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverLoadsRoutingModule { }

