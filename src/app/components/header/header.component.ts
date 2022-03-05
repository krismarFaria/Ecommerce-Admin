import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() title;
   @Input() backButton;
  @Input() backButtonModal;
  constructor(private modalController: ModalController) { }

 
  ngOnInit() {}

  close(){
    this.modalController.dismiss();
  }
}
