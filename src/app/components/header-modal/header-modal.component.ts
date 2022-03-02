import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {


  @Input() backButton;
  @Input() backButtonModal;
  @Input() title;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
 close(){
    this.modalController.dismiss();
  }
}
