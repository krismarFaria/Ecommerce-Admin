import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddProductComponent, EditProductComponent } from '../../components';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
})
export class ProductsByCategoryPage implements OnInit {

categoryId:string;
categoryName:string;
waiting:boolean;
products = [];
  constructor(
    private actRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController) 
    
    { 
    this.categoryId =  this.actRoute.snapshot.paramMap.get('id');
    this.categoryName =  this.actRoute.snapshot.paramMap.get('name');
  }

  ngOnInit() {
    this.getProducts();
  }


  async addProducts() {
    const modal = await this.modalController.create({
    component: AddProductComponent
    });
    await modal.present();
  
  }

  
  getProducts(){
    this.waiting = true;
    this.firebaseService.getColletionConditional('products', ref => ref.where('categoryId', '==', this.categoryId)).subscribe(data => {
      this.waiting = false;

     this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          price: e.payload.doc.data()['price'],
          image: e.payload.doc.data()['image'],
          stock: e.payload.doc.data()['stock'],
          description: e.payload.doc.data()['description']
  
        };
      });   
      
    },error =>{
  
    })
  }

  async editProduct(product) {
    const modal = await this.modalController.create({
    component: EditProductComponent,
    componentProps: { p: product }
    });
  
    await modal.present();
  
  }


  async options(product) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Editar',
        icon: 'share',
        handler: () => {
         this.editProduct(product)
        }
      },
       {
        text: 'Eliminar',
        icon: 'close',        
        handler: () => {
          this.firebaseService.deleteProduct(product.id);
        },
       
      }]
    });

    await actionSheet.present();
  }





}
