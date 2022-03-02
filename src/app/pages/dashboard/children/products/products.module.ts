import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddCategoryComponent, AddProductComponent, EditCategoryComponent, EditProductComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    ComponentsModule,
 ReactiveFormsModule
  ],
  declarations: [ProductsPage,  AddProductComponent,  EditProductComponent, AddCategoryComponent, EditCategoryComponent ]
})
export class ProductsPageModule {}
