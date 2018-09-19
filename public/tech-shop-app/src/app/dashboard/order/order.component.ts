import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Product } from '../../admin/product/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  products: Product[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.orderService.getShoppingCart()
      .subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.log('Error Error to get products in shopping cart');
        }
      )
  }

  deleteProduct(product: Product) {
    this.orderService.deleteProduct(product.id)
      .subscribe(
        data => {
          this.orderService.change(data['cant']);
          this.getShoppingCart();
        },
        error => {
          console.log('Error Error to delete product from cart');
        }
      )
  }

  changeQuantityProduct(product: Product) {
    const i = this.products.indexOf(product);
    this.products[i].pivot.cant = product.pivot.cant;
    this.getShoppingCart();
  }

}
