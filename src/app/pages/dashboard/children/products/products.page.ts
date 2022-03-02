import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

 categories = [];
 waiting: boolean;
  constructor(private firebaseService: FirebaseService,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getCategories();

  
  }

  async editCategory(category) {
    const modal = await this.modalController.create({
    component: EditCategoryComponent,
    componentProps: { c: category }
    });
  
    await modal.present();
  
  }


getCategories(){
  this.waiting = true;
  this.firebaseService.getCategories().subscribe(data => {
    this.waiting = false;
   this.categories = data.map(e => {
      return {
        id: e.payload.doc.id,
        name: e.payload.doc.data()['name'],
        image: e.payload.doc.data()['image'],
      

      };
    });
    
  
    
  },error =>{

  })
}

async addCategory() {
  const modal = await this.modalController.create({
  component: AddCategoryComponent 
  });
  await modal.present();

}



  async options(category) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [ {
        text: 'Editar',
        icon: 'share',
        handler: () => {
          this.editCategory(category)
        }
      }, {
        text: 'Eliminar',
        icon: 'close',        
        handler: () => {
          this.deleteCategory(category.id);
        }
      }]
    });

    await actionSheet.present();
  }


  async deleteCategory(id) {
    const loading = await this.firebaseService.loader().create();
    await loading.present();
  this.firebaseService.deleteCategory(id).then(res =>{
    this.deleteCategoryProducts(id)
    loading.dismiss();  
  },error =>{
    loading.dismiss();
  })

  }


  async deleteCategoryProducts(id) {
    const loading = await this.firebaseService.loader().create();
    await loading.present();
  this.firebaseService.deleteCategoryProducts(id).then(res =>{
    this.firebaseService.toast('Categoría eliminada', 'success')
    loading.dismiss();  
  },error =>{
    loading.dismiss();
  })

  }



}
