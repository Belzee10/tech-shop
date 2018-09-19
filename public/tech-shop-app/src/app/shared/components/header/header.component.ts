import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../admin/user/user';
import {Router} from '@angular/router';
import { OrderService } from '../../../dashboard/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  
  @Input() appTitle;
  email: string;
  role: string;
  cant: number;

  constructor(private authService: AuthService,
              private orderService: OrderService,
              private router: Router) { }  

  ngOnInit() {
    this.getEmail();
    this.getRole();
    if (this.authService.getUser()) {
      this.getShoppingCart();      
    }    
    this.getCant();
  }    

  logout() {
    this.authService.logout()
      .subscribe(
        () => {          
          this.goHome();
        },
        error => {
          console.log('Error: Unable to logout');
        }
      )    
  }    

  getShoppingCart() {
    this.orderService.getShoppingCart()
      .subscribe(
        () => {
          //
        },
        error => {
          console.log('Error Error to get cant of items in the shooping cart');
        } 
      )
  }

  getCant() {
    this.orderService.cant.subscribe(
      data => {
        this.cant = data;
      }
    )
  }

  getEmail() {
    this.authService.email.subscribe( 
      data => {
        this.email = data 
      });
  }
  getRole() {
    this.authService.role.subscribe( 
      data => {
        this.role = data 
      });
  }
  goHome() {
    this.router.navigate(['home']);
  }

}
