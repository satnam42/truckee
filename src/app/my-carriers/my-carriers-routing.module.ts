import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCarriersComponent } from './my-carriers.component';

const routes: Routes = [
  {
    path: '',
    component: MyCarriersComponent,
    data: {
      title: 'My Carriers'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCarriersRoutingModule { }

