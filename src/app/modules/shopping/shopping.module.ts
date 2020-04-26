import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ShoppingPage } from './shopping.page';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ShoppingRoutingModule],
  declarations: [ShoppingPage],
})
export class ShoppingPageModule {}
