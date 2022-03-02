import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

 pages = [
    { title: 'Inicio', url: '/dashboard/home', icon: 'home-outline' },
    { title: 'Ventas', url: '/dashboard/purchases', icon: 'cart-outline' },
    { title: 'Productos', url: '/dashboard/products', icon: 'bag-handle-outline' },   
    { title: 'Usuarios', url: '/dashboard/users', icon: 'person-outline' },     
    { title: 'Marketing', url: '/dashboard/marketing', icon: 'megaphone-outline' },      
    { title: 'Cerrar Sesión', url: 'logout', icon: 'exit-outline' },  
  ]

  selectedPath = '';

  constructor(private router: Router) {

     this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {
  }

  logout(url){
    if(url == 'logout'){
 this.router.navigate(['login']);
    }
   
  }
}
