import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-order-list-all',
  templateUrl: './order-list-all.component.html',
  styleUrls: ['./order-list-all.component.css']
})
export class OrderListAllComponent implements OnInit {

  title: string = 'Order List';
  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders() 
      .subscribe(
        data => {
          this.orders = data;
        },
        error => {
          console.log('Error Error to get all orders');
        }
      )
  }

}
