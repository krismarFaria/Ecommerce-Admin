import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss'],
})
export class PurchaseDetailsComponent implements OnInit {
  purchases = [];
  uid: string;
  waiting: boolean;

  @Input() p;

  cartItemCount: BehaviorSubject<number>
  constructor() { }

  ngOnInit() {
  }



}
