import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../admin/product/product.service';
import { Product } from '../../admin/product/product';
import { DatePipe } from '@angular/common';
import { OrderService } from '../order/order.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-card-details',
  templateUrl: './product-card-details.component.html',
  styleUrls: ['./product-card-details.component.css']
})
export class ProductCardDetailsComponent implements OnInit {

  productId: number;
  product: Product;
  loadingAdd: boolean = false;
  loadingRemove: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private datePipe: DatePipe,
              private orderService: OrderService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.productId = params['id']
    );
    this.getProduct();    
  }

  getProduct() {
    this.productService.getProduct(this.productId)
      .subscribe(
        data => {
          this.product = data;
        },
        error => {
          console.log("Error Error to get product");
        }
      )
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
