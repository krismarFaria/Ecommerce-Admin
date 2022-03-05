import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [{
      path: 'home',
      loadChildren: () => import('./children/home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'products',
      loadChildren: () => import('./children/products/products.module').then( m => m.ProductsPageModule)
    },    
    {
      path: 'marketing',
      loadChildren: () => import('./children/marketing/marketing.module').then( m => m.MarketingPageModule)
    },
   {
      path: 'users',
      loadChildren: () => import('./children/users/users.module').then( m => m.UsersPageModule)
    }, 
    {
      path: 'purchases',
      loadChildren: () => import('./children/purchases/purchases.module').then( m => m.PurchasesPageModule)
    } ,
  
  ]
  },
  {
    path: '',
    redirectTo: 'dashboard/home',
    pathMatch: 'full'
  },  
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
