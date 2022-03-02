import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalController } from '@ionic/angular';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {
  waiting: boolean;
  purchases = [];
  currentDate = this.datePipe.transform(Date.now(), 'YYYY-MM-dd');
  
  constructor(private firebaseService: FirebaseService,
    private datePipe: DatePipe,
     private modalController: ModalController) { }

  ngOnInit() {
    this.getPurchasesFromDate(this.currentDate);
  }

 
  async purchaseDetail(purchase) {
    const modal = await this.modalController.create({
      component: PurchaseDetailsComponent,
      componentProps: { p: purchase }
    });

    await modal.present();

  }



  formatDate(event) {
    const date = this.datePipe.transform(event.target.value, 'YYYY-MM-dd');   
    this.getPurchasesFromDate(date);
  }

  getPurchasesFromDate(date) {
    this.waiting = true;
    this.firebaseService.getColletionConditional('purchases',
      ref => ref.where('date', '==', date)).subscribe(data => {
        this.waiting = false;

        this.purchases = data.map(e => {
          return {
            id: e.payload.doc.id,
            date: e.payload.doc.data()['date'],
            hour: e.payload.doc.data()['hour'],
            products: e.payload.doc.data()['products'],
            image: e.payload.doc.data()['image'],
            total: e.payload.doc.data()['total']
          };
        });


      }, error => {

      })
  }
}
