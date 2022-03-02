import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasesPageRoutingModule } from './purchases-routing.module';

import { PurchasesPage } from './purchases.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PurchasesPage, PurchaseDetailsComponent]
})
export class PurchasesPageModule {}
