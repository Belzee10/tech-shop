import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { Product } from '../../../admin/product/product';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  title: string = "Order Details";
  orderId: number;
  order: Order;
  products: Product[] = [];
  total: number = 0;

  constructor(private orderService: OrderService,
              public authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.orderId = params['id']
    );
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderService.getOrder(this.orderId)
      .subscribe(
        data => {
          this.order = data;
          for (const product of data['products']) {
              this.products.push(product);
              this.getTotal(product);
          }
        },
        error => {
          console.log('Error Error to get order details');
        }
      )
  }

  getTotal(product) {
        const amount = product.price * product.pivot.cant;
        this.total += amount;        
  }

}
