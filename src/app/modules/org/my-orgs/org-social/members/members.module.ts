import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MembersPage } from './members.page';
import { MembersItemComponent } from './members-item/members-item.component';

const routes: Routes = [
  {
    path: '',
    component: MembersPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [MembersPage, MembersItemComponent],
})
export class MembersPageModule {}
