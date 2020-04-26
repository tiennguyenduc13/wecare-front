import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StorePage } from './store.page';
import { StoreItemComponent } from './store-item/store-item.component';

const routes: Routes = [
  {
    path: '',
    component: StorePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [StorePage, StoreItemComponent],
})
export class StorePageModule {}
