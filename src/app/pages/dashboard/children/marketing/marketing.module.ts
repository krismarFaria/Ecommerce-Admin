import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketingPageRoutingModule } from './marketing-routing.module';

import { MarketingPage } from './marketing.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddMarketingComponent, EditMarketingComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketingPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [MarketingPage, AddMarketingComponent, EditMarketingComponent]
})
export class MarketingPageModule {}
