import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../../admin/product/product';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnChanges {
  
  @Input() products: Product[];
  @Output() deleteProductEvent = new EventEmitter<Product>();
  @Output() changeQuantityProductEvent = new EventEmitter<Product>();
  title: string = 'Shopping Cart';
  total: number;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {   
    this.total = 0;
    if (this.products) {      
      for (const product of this.products) {
        const amount = product.price * product.pivot.cant;
        this.total += amount; 
      }
    }
  }

  addToCart(product: Product) {
    this.orderService.addToCart(product.id)
      .subscribe(
        data => {
          this.orderService.change(data['cant']);           
          product.pivot.cant = data['quantity'];
          this.changeQuantityProductEvent.emit(product);
        },
        error => {
          console.log('Error Error to add to cart');
        }
      )
  }

  removeFromCart(product: Product) {
    this.orderService.removeProduct(product.id)
      .subscribe(
        data => {
          this.orderService.change(data['cant']);
          product.pivot.cant = data['quantity'];
          this.changeQuantityProductEvent.emit(product);
        },
        error => {
          console.log('Error Error to remove product from cart');
        }
      )
  }

  deleteFromCart(product: Product) {
    this.deleteProductEvent.emit(product);
  }

}
