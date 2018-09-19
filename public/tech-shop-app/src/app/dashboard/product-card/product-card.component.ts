import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../admin/product/product';
import { DatePipe } from '@angular/common';
import { OrderService } from '../order/order.service';
import { AuthService } from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import { fade } from '../../shared/animations/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [
    fade    
  ]
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  loadingAdd: boolean = false;
  loadingRemove: boolean = false;

  constructor(private datePipe: DatePipe,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {    
  }

  isNew(): boolean {
    let date = new Date();
    let currentDate: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    let created_at = this.product.created_at.split(' ');
    if (currentDate !== created_at[0]) {
      return false;
    }
    return true;
  }

  addToCart(productId: number) {
    if (this.authService.getUser()) {
      this.loadingAdd = true;
      this.orderService.addToCart(productId)
      .subscribe(
        data => {
          this.orderService.change(data['cant']);
          this.product.cant = data['quantity'];
          this.loadingAdd = false;
        },
        error => {
          console.log('Error Error to add to cart');
        }
      )
    }
    else {
      this.goSignin();
    }    
  }

  removeFromCart(productId: number) {
    this.loadingRemove = true;
    this.orderService.removeProduct(productId)
      .subscribe(
        data => {
          this.orderService.change(data['cant']);
          this.product.cant = data['quantity'];
          this.loadingRemove = false;
        },
        error => {
          console.log('Error Error to remove product from cart');
        }
      )
  }

  goSignin() {
    this.router.navigate(['signin']);
  }

}
