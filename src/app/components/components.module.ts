import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';



@NgModule({
  declarations: [HeaderComponent,HeaderModalComponent],
  exports: [HeaderComponent,HeaderModalComponent],
  imports: [
    CommonModule,
     IonicModule, 
     FormsModule,
     ReactiveFormsModule
  ]
})
export class ComponentsModule { }
