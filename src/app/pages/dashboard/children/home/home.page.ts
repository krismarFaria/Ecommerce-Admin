import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  waiting: boolean;
  purchases = [];
  purchasesToday = [];
  users =[];
  usersToday =[];

  currentDate = this.datePipe.transform(Date.now(), 'YYYY-MM-dd')


  constructor(private firebaseService: FirebaseService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getPurchases();
    this.getUsers();
    this.getUsersToday();

  }

  ionViewWillEnter() {
    this.getPurchasesFromToday(this.currentDate);
  }

  formatDate(event) {
    const date = this.datePipe.transform(event.target.value, 'YYYY-MM-dd');
    this.getPurchasesFromToday(date);
  }

  getPurchases() {
    this.waiting = true;
    this.firebaseService.getColletion('purchases').subscribe(data => {
      this.waiting = false;
      this.purchases = data.map(e => {
        return {
          id: e.payload.doc.id,
        };
      });

    }, error => {

    })
  }

  getPurchasesFromToday(date) {
    this.waiting = true;
    this.firebaseService.getColletionConditional('purchases',
      ref => ref.where('date', '==', date)).subscribe(data => {
        this.waiting = false;

        this.purchasesToday = data.map(e => {
          return {
            id: e.payload.doc.id,
          };
        });


      }, error => {

      })
  }



  getUsersToday() {
    this.waiting = true;
    this.firebaseService.getColletionConditional('users', ref => ref.where('creationDate', '==', this.currentDate)).subscribe(data => {
        this.waiting = false;

        this.usersToday = data.map(e => {
          return {
            id: e.payload.doc.id,
          };
        });


      }, error => {

      })
  }


  getUsers() {
    this.waiting = true;
    this.firebaseService.getColletion('users').subscribe(data => {
        this.waiting = false;

        this.users = data.map(e => {
          return {
            id: e.payload.doc.id,
          };
        });


      }, error => {

      })
  }



  
  
}






