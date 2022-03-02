import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddMarketingComponent, EditMarketingComponent } from './components';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.page.html',
  styleUrls: ['./marketing.page.scss'],
})
export class MarketingPage implements OnInit {
  marketing = [];
  waiting: boolean;

  constructor(private firebaseService: FirebaseService,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController) { }

  
    ngOnInit() {
      this.getMarketing();
    }
  
  
  
  getMarketing(){
    this.waiting = true;
    this.firebaseService.getMarketing().subscribe(data => {
      this.waiting = false;
     this.marketing = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          price: e.payload.doc.data()['price'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description']
         
  
        };
      });
      
    
      
    },error =>{
  
    })
  }
  
  async addMarketing() {
    const modal = await this.modalController.create({
    component: AddMarketingComponent 
    });
    await modal.present();
  
  }


  async editMarketing(product) {
    const modal = await this.modalController.create({
    component: EditMarketingComponent,
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
         this.editMarketing(product)
        }
      },
       {
        text: 'Eliminar',
        icon: 'close',        
        handler: () => {
          this.firebaseService.deleteMarketing(product.id);
        },
       
      }]
    });

    await actionSheet.present();
  }


}
