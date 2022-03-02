import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  waiting: boolean;
  email =[];
  username =[];
  users =[];
  imgLoaded = false;
  user = {} as User;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getUsers();
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));    
    
  }



  getUsers() {
    this.waiting = true;
    this.firebaseService.getColletion('users').subscribe(data => {
        this.waiting = false;

        this.users = data.map(e => {
          return {
            id: e.payload.doc.id,
            email: e.payload.doc.data()['email'],
            username: e.payload.doc.data()['username'],
            image: e.payload.doc.data()['image'],
          };
        });


      }, error => {

      })
  }


}
