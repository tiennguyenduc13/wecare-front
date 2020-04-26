import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingPage } from './shopping.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ShoppingPage,
    children: [
      {
        path: 'store',
        redirectTo: '/shopping/tabs',
        pathMatch: 'full',
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../shopping/cart/outbox.module').then(
                (m) => m.OutboxPageModule
              ),
          },
        ],
      },
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./store/store.module').then((m) => m.StorePageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/shopping/tabs/store',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/shopping/tabs/store',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
